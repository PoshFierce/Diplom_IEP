import csv

import pandas as pd

from django.core.management import BaseCommand
from natasha import Segmenter, MorphVocab, NewsEmbedding, NewsMorphTagger, NewsSyntaxParser, NewsNERTagger, \
    NamesExtractor, Doc

from core.models import Course, Keyword


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def extract_all_content(self, filename):
        content = []
        with open(filename, newline='') as File:
            reader = csv.reader(File)
            for row in reader:
                print(row)
                content.append(row)
        return content

    def get_lemmas(self, sentence='я хочу стать веб-разработчиком на django и javascript, а также заниматься машинным обучением'):
        segmenter = Segmenter()
        morph_vocab = MorphVocab()

        emb = NewsEmbedding()
        morph_tagger = NewsMorphTagger(emb)
        syntax_parser = NewsSyntaxParser(emb)
        ner_tagger = NewsNERTagger(emb)

        nouns = []
        doc = Doc(sentence)
        doc.segment(segmenter)
        doc.tag_morph(morph_tagger)
        doc.parse_syntax(syntax_parser)
        doc.tag_ner(ner_tagger)

        for token in doc.tokens:
            if token.pos in ['X', 'NOUN', 'ADJ']:
                token.lemmatize(morph_vocab)
                nouns.append(token.lemma)
        return nouns

    def handle(self, *args, **options):
        a = pd.read_csv("data2021.csv")
        b = pd.read_csv("rating2021.csv")
        b.drop(1)
        b = b.iloc[:-2]
        b.dropna(axis=1)
        b = b.rename(columns=({'Ф.И.О.': 'ФИО'}))
        merged = a.merge(b, on='ФИО')
        titles = list(filter(lambda x: 'рейтинг' in x or 'семестр' in x, merged.columns))
        merged = merged[titles]

        for column in titles:
            merged[column] = merged[column].apply(
                lambda x: x
                    .replace('-', '!')
                    .replace('(', '!')
                    .replace(',', '!')
                    .split('!')[0])

        try:
            merged[titles[-1]] = merged[titles[-1]].apply(lambda x: int(x))
        except ValueError:
            pass

        merged.to_csv("output.csv", index=False)

        blocks = []

        blocks.append(merged.groupby(titles[0]).mean(titles[-1]))
        blocks.append(merged.groupby(titles[1]).mean(titles[-1]))
        blocks.append(merged.groupby(titles[2]).mean(titles[-1]))

        for block in blocks:
            for line in block.iterrows():
                name, rating = line
                course, _ = Course.objects.get_or_create(title=name)
                course.avg_score = rating[0]
                course.semester = 7
                course.save()

                for lemma in self.get_lemmas(name):
                    keyword, _ = Keyword.objects.get_or_create(title=lemma)
                    course.keywords.add(keyword)
                    course.save()
                    print(lemma)
