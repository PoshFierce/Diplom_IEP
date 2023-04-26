from models import Period, Lesson
import random

ans = {}


def read_times():
    # считывание расписания
    result = []
    f = open(r'files\times.txt')
    for i in f.readlines():
        temp = i.rstrip().split(' ')
        a = Period(temp[0], temp[1]).__str__()
        result.append(a)
    f.close()
    return result


def read_lessons():
    # считывание списка уроков
    result = []
    f = open(r'files\lessons.txt')
    for i in f.readlines():
        result.append(i.rstrip().split())
    f.close()
    return result


def is_repeat(time, day):
    # проверка на совпадение при генерации расписания
    global ans
    global times
    try:
        repeat = ans[(times[time], day,)]
        return True
    except KeyError:
        return False


def init_population(lessons):
    # процесс генерации
    global times
    global ans
    for lesson in lessons:
        # для каждого урока генерируется рандомные время и день недели
        rand_time = None
        rand_week_day = None
        flag = True
        while flag:
            # проверка на совпадения
            rand_time = random.randint(0, len(times) - 1)
            rand_week_day = random.randint(1, 6)
            flag = is_repeat(rand_time, rand_week_day)
        # запись результата
        ans[(times[rand_time], rand_week_day,)] = lesson
    return ans


times = read_times()
less = read_lessons()

for i in times:
    print(i.__str__())

for i in less:
    print(i)
# вывод результата
answers = init_population(less)
for key, value in answers.items():
    print(key, value)
