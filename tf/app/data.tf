data "terraform_remote_state" "cluster" {
  backend = "s3"
  config = {
    encrypt = true
    bucket  = var.questo-infra-bucket
    region  = var.region
    key     = "tfstates/${var.env}/eks/cluster.tfstate"
  }
}

data "terraform_remote_state" "questo-server" {
  backend = "s3"
  config = {
    encrypt = true
    bucket  = var.questo-infra-bucket
    region  = var.region
    key     = "tfstates/${var.env}/questo/app.tfstate"
  }
}

data "aws_eks_cluster" "cluster" {
  name = data.terraform_remote_state.cluster.outputs.cluster_name
}

data "aws_eks_cluster_auth" "cluster" {
  name = data.terraform_remote_state.cluster.outputs.cluster_name
}

output "cluster_id" {
  value = data.aws_eks_cluster.cluster
}
