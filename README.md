# **I. Introduction**

## **Predicting Wine Quality Using Chemical Features**

This project explores how chemical properties of wine can be used to predict quality ratings using machine learning. The insights generated can benefit multiple stakeholders in the wine production and selection process.

### **Applications & Benefits**

#### **1. Quality Control**  
Provides reliable predictions of wine quality without the need for expert sommeliers or conducting time-consuming taste tests.

#### **2. Production Improvement**  
Enables feedback during the production stage, allowing winemakers to experiment and optimize blends before launching wine tasting panels.

#### **3. Customer Satisfaction**  
A mobile app could be developed to leverage the trained ML model. By scanning a wine label or QR code, customers can instantly view quality predictions—helpful for making quick decisions while shopping.

---

### **Tools & Technologies Used**
- **Python Libraries**: Pandas, Scikit-learn  
- **Visualization**: Tableau  

---

# **II. Data & Preparation**

## **Source**  
Data obtained from the **UCI Machine Learning Repository**  
- Dataset: [Wine Quality Dataset](https://archive.ics.uci.edu/dataset/186/wine+quality)  
- Original Study: [DOI: 10.1016/j.dss.2009.05.016](https://doi.org/10.1016/j.dss.2009.05.016)  
- Files: `winequality-red.csv`, `winequality-white.csv`  

---

## **Data Cleaning & Preparation**

### **1. Combined Dataset (Merged, Supervised, PCA Applied)**
**Tech Stack**: *Python (Pandas)*  

#### **Steps Taken**
- Merged red and white wine datasets; added a `type` column  
- Cleaned and saved as `cleaned_wine_data.csv`  
- Verified data types and ensured consistent formatting  
- Confirmed no missing values using `DataFrame.info()`  
- Applied one-hot encoding (`pd.get_dummies()`) on wine types  

#### **Key Observations**
- **Data Imbalance**:  
  - White wine: 4898 entries  
  - Red wine: 1599 entries  
- **No Missing Values**:  
  - Confirmed by both the dataset description and manual verification  

#### **Implications for Modeling**
- Bias toward white wine due to imbalance  
- **Analogy**: If test conditions vary between groups (like wine types), it compromises the validity of comparisons and predictions.  

---

### **2. Separate Datasets (Red vs. White, Supervised, PCA Applied)**
**Tech Stack**: *Python (Pandas)*  

- Treated `winequality-red.csv` and `winequality-white.csv` as separate groups  
- Standardized column formats and data types  

---

# **III. Exploratory Data Analysis (EDA)**

### **EDA Objectives**
- Generate summary statistics  
- Compare distributions between red and white wines  
- Analyze feature correlations  

### **Reference for EDA Inspiration**  
- [Red Wine Data Analysis – External Guide](https://bibinmjose.github.io/RedWineDataAnalysis/?utm_source=chatgpt.com#introduction)  
Used to guide meaningful analysis and aid in model selection for future enhancements.

---

# **IV. Visualization (Tableau)**

### **Visual Insights Generated**
- **Scatter plot:** Vinegar vs. Freshness  
- **Scatter plot:** Sweet vs. Salty    
- **Scatter plot:** Alcohol vs. Density    
- **Bar Chart:** Quality Distribution
- **Bar Chart:** Average Quality of Wine by Type
- **Heat Map:** Alcohol vs. Quality by Type    

---

# **V. Machine Learning Model**

### **Model Used**: Random Forest Classifier  
- Objective: Classify wine quality based on chemical properties  
- Methodology:
  - Train-test split
  - Model training and evaluation
  - Accuracy score and classification report
- Reviewed predictions, false positives, and false negatives  

---

# **VI. Feature Importance**

### **Key Learnings**
- Identified top predictors (e.g., alcohol, acidity) influencing wine quality  
- Visualized feature importance using model interpretability tools  
- Compared variable importance between red and white wines  

---

# **VII. Conclusion**

### **Summary**
- Machine learning is effective for predicting wine quality based on chemical analysis  
- Exploratory and predictive analysis provided meaningful insights  

### **Future Directions**
- Expand dataset for more balanced classes  
- Explore regression modeling for predicting exact quality scores  
- Develop and deploy a web/mobile app for real-time wine evaluation  

---
