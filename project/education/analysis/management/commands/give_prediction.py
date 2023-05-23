from django.core.management import BaseCommand
from natasha import Segmenter, MorphVocab, NewsEmbedding, NewsMorphTagger, NewsSyntaxParser, NewsNERTagger, \
    NamesExtractor, Doc


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        segmenter = Segmenter()
        morph_vocab = MorphVocab()

        emb = NewsEmbedding()
        morph_tagger = NewsMorphTagger(emb)
        syntax_parser = NewsSyntaxParser(emb)
        ner_tagger = NewsNERTagger(emb)

        nouns = []
        sentence = 'я хочу стать веб-разработчиком на django и javascript, а также заниматься машинным обучением'
        doc = Doc(sentence)
        doc.segment(segmenter)
        doc.tag_morph(morph_tagger)
        doc.parse_syntax(syntax_parser)
        doc.tag_ner(ner_tagger)

        for token in doc.tokens:
            print(token)
            if token.pos in ['X', 'NOUN', 'ADJ']:
                token.lemmatize(morph_vocab)
                nouns.append(token.lemma)
        print(nouns)

