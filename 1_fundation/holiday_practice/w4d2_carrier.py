class Aircraft(object):
    def __init__(self, ammo, max_ammo, base_damage, type, all_damage):
        self.ammo = ammo
        self.max_ammo = max_ammo
        self.base_damage = base_damage
        self.type = type
        self.all_damage = all_damage

    def fight(self):
        damage = self.ammo * self.base_damage
        self.ammo = 0
        self.all_damage += damage
        return damage
    
    def refill(self, amount):
        remaining = amount - (self.max_ammo - self.ammo)
        self.ammo += amount - remaining
        return remaining

    def get_type(self):
        return self.type
    
    def __str__(self):
        return 'Type ' + self.type + ', Ammo: ' + str(self.ammo) + ', Base damage: ' + str(self.base_damage) + ', All damage: ' + str(self.all_damage)

class F16(Aircraft):
    def __init__(self):
        super().__init__(0, 8, 30, 'F16', 0)

class F35(Aircraft):
    def __init__(self):
        super().__init__(0, 12, 50, 'F35', 0)

class Carrier(object):
    def __init__(self, ammo, hp):
        self.ammo_store = ammo
        self.hp = hp
        self.aircrafts = []
    
    def add_aircraft(self, type):
        if type == 'F16':
            fighter = F16()
        elif type == 'F35':
            fighter = F35()
        self.aircrafts.append(fighter)

    def sort_aircrafts(self, filltype):
        for aircraft in self.aircrafts:
            if aircraft.type == filltype and self.ammo_store > 0:
                remaining = aircraft.refill(self.ammo_store)
                filled_ammo = self.ammo_store - remaining
                self.ammo_store -= filled_ammo

    def fill(self):
            if self.ammo_store > 0:
                self.sort_aircrafts('F35')
                self.sort_aircrafts('F16')
            try:
                if self.ammo_store <= 0:
                    self.ammo_store += ''
            except TypeError:
                print('Ammo store has to be bigger than 0')
