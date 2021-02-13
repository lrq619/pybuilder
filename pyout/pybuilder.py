#!/usr/bin/python3
import tkinter as tk
import tkinter.ttk as ttk
from form import Form

class Form1(Form):
	def __init__(self):
	#Properties of main window.
		title="pybuilder"
		width=600
		height=400
		x=100
		y=100
		bg="#F0F0F0"
		Form.__init__(self,title,width,height,x,y,bg)
		
		self.style = ttk.Style()

	def change_style(self,style_name,foreground,background):
		self.style.map(style_name,
			foreground=foreground,
			background=background
			)
