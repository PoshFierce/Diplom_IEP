class Subject:
    def __init__(self, title, group):
        self.title = title
        self.group = group

    def __str__(self):
        return self.title, self.group


class Period:
    def __init__(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time

    def __str__(self):
        return self.start_time, self.end_time


class Lesson:
    def __init__(self, period, subject, week_day):
        self.period = period
        self.subject = subject
        self.week_day = week_day

    def __str__(self):
        return self.period, self.subject, self.week_day
