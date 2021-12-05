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
    QUESTO_API_URL = data.terraform_remote_state.questo-server.outputs.load_balancer_hostname
  }
}

resource "kubernetes_deployment" "questo-ssr-app-deployment" {
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
      "app.kubernetes.io/name" = lookup(kubernetes_deployment.questo-ssr-app-deployment.metadata.0.labels, "app.kubernetes.io/name")
    }

    port {
      port        = 3000
      target_port = 3000
    }

    type = "NodePort"
  }
}

output "node_port" {
  value = kubernetes_service.questo-ssr-service.spec[0].port.0.node_port
}
