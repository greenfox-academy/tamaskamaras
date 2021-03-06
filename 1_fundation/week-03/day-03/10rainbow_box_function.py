# create a square drawing function that takes 2 parameters:
# the square size, and the fill color,
# and draws a square of that size and color to the center of the canvas.
# create a loop that fills the canvas with rainbow colored squares.

from tkinter import *

my_root = Tk()

my_canvas = Canvas(my_root, width = '300', height = '300')
my_canvas.pack()

def square_drawing (size, color):
    rainbow = ['red', 'yellow', 'pink', 'green', 'purple', 'orange', 'blue']
    basis = 150 - (size / 2)
    unit = basis / 6
    for i in range(6):
        box = my_canvas.create_rectangle(0 + (i * unit), 0 + (i * unit), 300 - (i * unit), 300 - (i * unit), fill = rainbow[i])

    centerbox = my_canvas.create_rectangle(150 - (size / 2), 150 - (size / 2), 150 + (size / 2), 150 + (size / 2), fill = color)
square_drawing(100, 'black')
my_root.mainloop()