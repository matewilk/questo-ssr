provider "aws" {
  region = var.region
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

data "kubernetes_namespace" "questo-ssr-namespace" {
  metadata {
    name = "questo-namespace-${var.env}"
  }
}

resource "kubernetes_config_map" "questo-ssr-configmap" {
  metadata {
    name      = "questo-ssr-configmap-${var.env}"
    namespace = data.kubernetes_namespace.questo-ssr-namespace.metadata.0.name
  }

  data = {
    QUESTO_API_URL = "${data.terraform_remote_state.questo-server.outputs.load_balancer_hostname}/api"
  }
}

resource "kubernetes_deployment" "questo-ssr" {
  metadata {
    name = "questo-ssr-app-deployment-${var.env}"
    labels = {
      "app.kubernetes.io/name" = "QuestoSSR-${var.env}"
    }
    namespace = data.kubernetes_namespace.questo-ssr-namespace.metadata.0.name
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        "app.kubernetes.io/name" = "QuestoSSR-${var.env}"
      }
    }

    template {
      metadata {
        labels = {
          "app.kubernetes.io/name" = "QuestoSSR-${var.env}"
        }
      }
      spec {
        container {
          name  = "questo-ssr-container-${var.env}"
          image = "matewilk/questo-ssr-image-${var.env}"

          port {
            container_port = 3000
          }

          env_from {
            config_map_ref {
              optional = false
              name     = kubernetes_config_map.questo-ssr-configmap.metadata.0.name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "questo-ssr-service" {
  metadata {
    name      = "questo-ssr-service-${var.env}"
    namespace = data.kubernetes_namespace.questo-ssr-namespace.metadata.0.name
  }
  spec {
    selector = {
      "app.kubernetes.io/name" = lookup(kubernetes_deployment.questo-ssr.metadata.0.labels, "app.kubernetes.io/name")
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "NodePort"
  }
}

#output "node_port" {
#  value = kubernetes_service.questo-ssr-service
#}

resource "kubernetes_ingress" "questo-ssr-ingress" {
  wait_for_load_balancer = true
  metadata {
    name      = "questo-ssr-ingress-${var.env}"
    namespace = data.kubernetes_namespace.questo-ssr-namespace.metadata.0.name
    annotations = {
      "kubernetes.io/ingress.class"                  = "alb"
      "alb.ingress.kubernetes.io/load-balancer-name" = "questo-server-alb-${var.env}"
      "alb.ingress.kubernetes.io/group.name"         = "questo-${var.env}"
      "alb.ingress.kubernetes.io/group.order"        = "1000"
      "alb.ingress.kubernetes.io/target-type"        = "ip"
      "alb.ingress.kubernetes.io/scheme"             = "internet-facing"
      "alb.ingress.kubernetes.io/listen-ports"       = "[{\"HTTP\": 80}]"
      "alb.ingress.kubernetes.io/healthcheck-path"   = "/health"
      "alb.ingress.kubernetes.io/healthcheck-port"   = "traffic-port"
    }
  }

  spec {
    rule {
      http {
        path {
          path = "/front"
          backend {
            service_name = kubernetes_service.questo-ssr-service.metadata.0.name
            service_port = 80
          }
        }
      }
    }
  }
}

#resource "aws_alb_listener" "questo-ssr-listener" {
#  load_balancer_arn = data.aws_alb.alb.arn
#  port = 80
#  protocol = "HTTP"
#
#  default_action {
#    type = "fixed-response"
#
#    fixed_response {
#      content_type = "text/plain"
#      status_code = "404"
#    }
#  }
#}
#
#resource "aws_alb_target_group" "questo-ssr-target-group" {
#  name = "questo-ssr-target-group-${var.env}"
#  port = 80
#  protocol = "HTTP"
#  vpc_id = data.aws_vpc.vpc.id
#  target_type = "ip"
#
#  health_check {
#    enabled = true
#    path = "/health"
#    port = "80"
#  }
#}
#
#resource "aws_alb_target_group_attachment" "questo-ssr-tg-attachment" {
#  target_group_arn = aws_alb_target_group.questo-ssr-target-group.arn
#  target_id        = kubernetes_service.questo-ssr-service.connection.0.ip
#}
#
#resource "aws_alb_listener_rule" "questo-ssr-listener-rule" {
#  listener_arn = aws_alb_listener.questo-ssr-listener.arn
#  priority = 99
#
#  action {
#    type = "forward"
#    target_group_arn = aws_alb_target_group.questo-ssr-target-group.arn
#  }
#
#  condition {
#    path_pattern {
#      values = ["/*"]
#    }
#  }
#}
