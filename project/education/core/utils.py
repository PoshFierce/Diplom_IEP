import pandas as pd
from catboost import CatBoostClassifier
from sklearn.model_selection import train_test_split
from django.db.models import F, Value


def get_cat(x):
    return float(x.replace(',', '.'))


def get_classifier():
    merge_df = pd.read_csv('output.csv')
    merge_df['рейтинг'] = merge_df['рейтинг'].apply(get_cat)
    X = merge_df.drop(columns=['Блок 3 (8 семестр)'])
    y = merge_df['Блок 3 (8 семестр)']
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=23)
    clf = CatBoostClassifier(
        iterations=100,
        learning_rate=0.1,
        max_depth=6,
        random_seed=23,
        eval_metric='Accuracy'
    )

    clf.fit(X_train, y_train,
            cat_features=[0, 1],
            eval_set=(X_val, y_val),
            verbose=True)

    return clf


def predict(clf, subject, rating):
    return clf.predict([subject, 0, rating])
