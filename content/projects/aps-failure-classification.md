---
title: APS Failure Classification
summary: An end-to-end predictive maintenance pipeline for Scania trucks, built around the asymmetric cost of missed failures.
category: Machine learning
cover: /images/truck-project.png
tags: [Python, XGBoost, FastAPI, Docker, AWS]
order: 1
repository: https://github.com/iamchandra21/APS-failure-classification
---

Solving a 50:1 asymmetric cost problem with end-to-end Machine Learning pipelines.

## The Business Problem

I worked on a predictive maintenance problem for Scania heavy-duty trucks. The Air Pressure System (APS) is critical for braking and engine performance, and when it fails, it's expensive. However, the bigger challenge lies in correctly isolating the fault.

If maintenance teams incorrectly treat a non-APS fault as an APS fault, that costs the business money in unnecessary labor and parts. But if they miss a real APS failure, a truck breaks down on the road, costing **50 times more**.

## The Solution & Pipeline

I built a full end-to-end ML pipeline, entirely automated and production-ready. The system acts on a 6-stage lifecycle:

1. Data validation and schema checks
2. Drift detection against baseline
3. RobustScaler and SMOTETomek transformation
4. XGBoost training
5. Evaluation against the production model
6. Deployment

The pipeline is triggered via a dedicated FastAPI microservice interface. Hitting `GET /train` kicks off the entire retraining lifecycle, while `POST /predict` handles real-time inference on new sensor matrices.

## Key Technical Decisions

### Modeling: XGBoost

Chosen for its high efficacy on complex tabular sensor data, rapid training performance, and native feature importance extraction spanning all 171 sensor features.

### Balancing: SMOTETomek

The dataset was 98.3% non-failures. I combined synthetic oversampling (SMOTE) with Tomek link cleaning to generate a highly refined and clean decision boundary.

### Preprocessing

Given that raw sensor readings naturally exhibit massive outliers during machine degradation, I employed **RobustScaler** to safely normalize data unaffected by extreme values.

### Serialization: Dill

Both the trained model and preprocessor are wrapped in a unified `SensorModel` object and serialized via dill so production inference uses identically bounded transformations as training.

## Deployment & Challenges

The hardest engineering challenge was the automated model evaluation logic. The system does not eagerly overwrite existing production models. Instead, before deployment, it asserts that the new model improves the weighted F1-score by **at least 2%** over the currently live model.

I strictly guarded model rot: Before any pipeline execution, KS-test (Kolmogorov-Smirnov) based drift detection runs parallel checks across all 171 features to ensure feature distribution hasn't significantly shifted.

## Architecture and results gallery

![Flowchart](/images/aps-workflow/APS%20Failure%20Classification%20High%20Level%20Code%20Flow.png)

![Deployment arch](/images/aps-workflow/Deployment%20Architecture.png)

![Cloud training](/images/aps-screenshots/15-Cloud%20Training.png)

![Prediction u i](/images/aps-screenshots/16-predection%20UI.png)

![Prediction output](/images/aps-screenshots/19-prediction_output.png)

![Streamlit upload](/images/aps-screenshots/17-streamlit%20ui%20upload%20file.png)

![Github actions](/images/aps-screenshots/05-Running%20Job.png)

![Ecr image](/images/aps-screenshots/10-ecr%20image%20latest.png)

![S3 artifacts](/images/aps-screenshots/11-S3%20artifacts%20and%20model.png)

![Ec2 connect](/images/aps-screenshots/07-EC2%20connect.png)

## Explore the analysis

[Read the EDA notebook](https://nbviewer.org/github/iamchandra21/APS-failure-classification/blob/main/notebooks/Scania_APS_failure_prediction.ipynb).

## Results

The existing portfolio reports 90% accuracy, approximately 25% fewer false predictions, and 25% faster diagnosis over a three-month project. These figures are carried over from the original write-up; evaluation data and methodology should accompany future updates.

## Conclusion

The project connects sensor classification with validation, deployment, and monitoring. Its central design consideration is the higher business cost of a missed APS failure.
