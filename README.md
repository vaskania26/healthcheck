## HEALTHCHECK deploy instruction with docker cli and aws cli
**Step 1: Build the Docker image from your Dockerfile.**

     docker build -t healthZ .
     
**Step 2: Authenticate to your default registry**

     aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.eu-central-1.amazonaws.com
      
**Step 3: Create a repository**

     aws ecr create-repository \
           --repository-name healthRepo \
           --image-scanning-configuration scanOnPush=true \
           --region eu-central-1
    
**Step 4: Push an image to Amazon ECR**
**4.1 List the images you have stored locally to identify the image to tag and push.**        
         
     docker images
**4.2 Tag the image to push to your repository.**   

     docker tag healthZ:latest aws_account_id.dkr.ecr.eu-central-1.amazonaws.com/healthRepo:latest
**4.3 Push the image.**
         
     docker push aws_account_id.dkr.ecr.eu-central.amazonaws.com/healthRepo:latest

**Step 5: Pull an image from Amazon ECR**

     docker pull aws_account_id.dkr.ecr.eu-central-1.amazonaws.com/healthRepo:latest
           
           
          
