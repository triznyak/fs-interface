# Deployment plan

The current solution isn't cloud-ready, particularly for AWS (which I'm most familiar with). Though similar services might exist on other cloud platforms, I'll focus on AWS.

## Types of Deployments:

#### Traditional:

- **EC2**: 
  - If I opt for EC2, I'd deploy directly to this virtual server. However, there are inherent challenges such as the need for routine maintenance – patching, scaling, and more. Also, anticipating high traffic, I'd have to configure a load balancer, possibly the AWS ELB.
  
- **ECS**:
  - I'd need to dockerize the application before deploying on ECS. Furthermore, I'd also need to integrate a web framework like Express.js to effectively handle incoming REST calls.

#### Serverless:

- **AWS Lambda and API Gateway**: 
  - I view this as an optimal choice for lightweight applications that may need to autoscale and potentially experience unpredictable traffic patterns. To adopt this, I'll have to restructure the code to align with an event-driven architecture.

## Resources:

- **S3**: 
  - Ideal for storing both the content and the 'mapping.json' file. Given that the current implementation leans heavily on a local file system, I believe it's wise to introduce a data interface to infuse flexibility.

- **IAM**: 
  - I'll utilize IAM to ensure the application has the necessary permissions.

## Deployment:

- **GitHub Actions**: 
  - Using GitHub Actions will enable me to efficiently build and test the application on GitHub itself.

- **AWS CodeDeploy**: 
  - I'd leverage AWS CodeDeploy for its automated deployment capabilities, especially since it flawlessly integrates with GitHub and deploys to EC2, Lambda, or ECS.

## Conclusion:

In conclusion, my preferred approach would be to transform the codebase to an event-driven architecture. Then, I'd develop a Lambda function and link it with an API Gateway that can process incoming requests and direct them to the Lambda function. As for storage, I'd pivot to S3, necessitating the inclusion of a dedicated interface that could be encapsulated in an S3 datastore class.
