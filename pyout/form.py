#!/usr/bin/python3
import tkinter as tk
import tkinter.font as tkFont
import tkinter.ttk as ttk

class Form:
    def __init__(self,title,width=600,height=480,x=700,y=150,bg="#f0f0f0"):
        self.window = tk.Tk()
        self.window.title(title)
        self.size_str = str(width)+"x"+str(height)+"+"+str(x)+"+"+str(y)
        self.window.geometry(self.size_str)
        self.window.config(bg=bg)
        
        
