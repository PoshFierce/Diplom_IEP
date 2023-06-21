from django.core.management import BaseCommand
import pandas as pd
import numpy as np


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        data = pd.read_csv('data2021.csv', index_col=0)
        rating = pd.read_csv('rating2021.csv', header=0).iloc[1:-2, :]
        rating_selected = rating.loc[:, ['Ф.И.О.', 'рейтинг']].rename(columns={'Ф.И.О.': 'ФИО'})
        rating_selected_dropna = rating_selected.dropna()
        data_selected = data.loc[:, ['ФИО', 'Блок 1 (7 семестр)', 'Блок 2 (7 семестр)', 'Блок 3 (8 семестр)']]
        merge_df = data_selected.merge(rating_selected_dropna, on='ФИО').set_index('ФИО')
        merge_df = merge_df.replace('Дизайн (Системы постпроцессинга )- Газизов Р.',
                                    'Дизайн (Системы постпроцессинга)- КостюкД.')
        titles = list(filter(lambda x: 'семестр' in x, merge_df.columns))
        for column in titles:
            merge_df[column] = merge_df[column].apply(
                lambda x: x
                    .replace('Кросс-платформенная', 'Кроссплатформенная')
                    .replace('-', '!')
                    .replace('(', '!')
                    .replace(',', '!')
                    .split('!')[0])

        merge_df.to_csv("output.csv", index=False)
