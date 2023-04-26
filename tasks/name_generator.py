import random

name = 'EASYDULECHKA'
# входные ланные
print("input:\t", name, '\n_______________________')
size = len(name)
alphabet = [chr(i) for i in range(65, 91)]
population_size = 100
elitism_size = int(population_size * 0.3)
max_generation = 100


class Genome:
    population = []
    matches = 0

    def __str__(self):
        return self.population, self.matches


def random_population():
    # формирование популяции
    global alphabet
    random.shuffle(alphabet)
    rand_pop = [alphabet[i] for i in range(size)]
    return rand_pop


def initial_population(init_population):
    # начальная популяция
    for i in range(population_size):
        genome = Genome()
        genome.population = random_population()
        init_population.append(genome)
    return init_population


def print_population(population):
    # вывод популяции
    for i in population:
        print(i.__str__())


def calc_matches(population):
    # подсчёт совпадений
    target = [x for x in name]
    target_size = len(target)
    pop_size = len(population)
    for i in range(pop_size):
        matches = 0
        for k in range(target_size):
            if target[k] == population[i].population[k]:
                matches += 1
        population[i].matches = matches
    return population


def matches_sort(first, second):
    return first > second


def sort_by_matches(population):
    # сортировка
    population.sort(key=lambda x: x.matches)
    return population


def elitism(population, e_size):
    pop = population.copy()
    population.clear()
    for i in range(len(pop) - e_size, len(pop)):
        population.append(pop[i])
    return population


def mutate(member):
    # мутация
    target_size = len(name)
    ipos = random.randint(0, target_size - 1)
    delta = random.randint(65, 90)
    member.population[ipos] = chr(delta)


def print_best(population):
    print(population[len(population) - 1].__str__())


def new_member(member_one, member_two):
    # формирование новой особи
    new_memb = []
    for i in range(len(member_one)):
        if i % 2 == 0:
            new_memb.append(member_one[i])
        else:
            new_memb.append(member_two[i])
    return new_memb


def create_population(population):
    # формирование популяции
    new_population = []
    previous = population.copy()
    population.clear()
    for i in range(len(previous)):
        for j in range(len(previous) - 1):
            new_population.clear()
            genome = Genome()
            new_population = new_member(previous[j].population, previous[j + 1].population)
            genome.population = new_population.copy()
            mutate(genome)
            population.append(genome)
    return population


population = []
initial_population(population)

for i in range(max_generation):
    # получение результата
    calc_matches(population)
    sort_by_matches(population)
    previous = population.copy()
    if population[len(population) - 1].matches == len(name):
        print('\n_______________________')
        print("output:", end='\t')
        print_best(population)
        break
    print_best(population)
    elitism(population, elitism_size)
    create_population(population)
    if i == max_generation - 1:
        print("looks bad...")
