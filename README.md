# I. Introduction
 
### **Predicting wine quality using chemical features**

#### Quality control:     
Gives projection of wine quality without needing to hire wine experts and performing new taste test experiment

#### Production improvement:   
Allows for feedback about wine to be generated at the production stage so that different candidate wines can be generated before wine taste test  

#### Customer satisfaction:  
An app can be created for the ML model trained on wine tasting so that customers can look up a wine’s scores using a picture, QR code, or brand and name of the wine. This will influence what 
customers buy in case they do not know what wine to pick up and if they are in a hurry.   

### Tools used  
- Pandas  
- Scikit-learn  
- Tableau

# II. Data & Preparation  

### Source: 
  UCI Machine Learning Repository
  - URL: https://archive.ics.uci.edu/dataset/186/wine+quality  
  - Original Source: https://doi.org/10.1016/j.dss.2009.05.016  
  - Files used: winequality-red.csv, winequality-white.csv
    
### **Datasets**  

### First Dataset: Merge, Supervised, Using PCA
###### Python: Pandas  

**Data Cleaning**

  - Merged datasets and added 'type' column  
  - Cleaned and exported as cleaned_wine_data.csv  
  - Imported as cleaned_wine_data.csv  
  - Set data types  
  - Counted Entries in Datasets  
  - Determined there were no missing values  
  - Used pd.get_dummies(): 1 hot encoding on types of wines  

**Important Features of the Data**   
  - More white wine data points than red wine data points  
    - Count
      - White: 4898
      - Red: 1599  
  - No Missing Values  
    - As Stated By https://archive.ics.uci.edu/dataset/186/wine+quality
    - Verified with Pandas  
    - Using DataFrame.info()  
    - All columns have 6497 non-null entries, which is equal to the size of the range index.   

**Effects on ML model**  
  - Will be able to predict wine scores regardless of colors (white or red) but includes the bias of the dataset   
  - Reason for Bias: More white wines than red wines in data may affect the score for white    
  - In Layman’s Terms:
    - When taking a test, all participants need to have the same conditions when taking the test.
    - The participants are no longer comparable when they don’t have the same conditions.
    - The test measures differences between identical participants. 

**Second Data Grouping: Separate, Supervised, using PCA**  
###### Python: Pandas  
  - Imported as winequality-red.csv and winequality-white.csv
  - Changed datatypes

# III. Exploratory Data Analysis

Summary statistics and distributions
Comparisons between red and white wines  
Correlation analysis of features  
See this website as a starting point: https://bibinmjose.github.io/RedWineDataAnalysis/?utm_source=chatgpt.com#introduction  
The purpose behind using this source is to get a guide on generating good data analysis that can be used for future collaborators to understand the dataset and to perhaps choose different ML models to create better predictions of wine score.   


# IV. Visualization (Tableau)  
Exploratory Data Analysis   
Quality distribution histograms  
  - Alcohol vs. quality boxplots
  - Heatmaps of correlations
  - Dashboard combining key insights


# V. Machine Learning Model  
  - Goal: Classify wine quality using chemical properties  
  - Model: Random Forest Classifier  
  - Train-test split, accuracy score, classification report  
  - Evaluated predictions and errors  

# VI. Feature Importance  
  - Identified key predictors (e.g., alcohol, acidity)  
  - Visualized top contributing features to wine quality  
  - Compared results across wine types  

# VII. Conclusion  
  - Restated findings: ML can predict wine quality  
  - Key insights from analysis  
  - Future ideas: more data, regression model, deployment  
