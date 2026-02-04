import kivy
from kivy.uix.label import Label
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.checkbox import CheckBox
from kivy.uix.popup import Popup
from kivy.uix.image import Image
from kivy.uix.boxlayout import BoxLayout
    

class Funflames(Widget):
    def clear(self,instance):
        self.tex.text=''
        self.tex2.text=''
    def on_checkbox(self,checkbox,value):
        if value:
            checkbox.text_input.password=True
            checkbox.text_input.password_mask='*'
        else:
            checkbox.text_input.password=False
            checkbox.text_input.password_mask=''

    def calculate(self, instance):
        alpha1 = self.tex.text.replace(" ", "")
        alpha2 = self.tex2.text.replace(" ", "")
        alp1 = self.tex.text
        alp2= self.tex2.text
        
    
        alpha1 = alpha1.lower()
        alpha2 = alpha2.lower()
        if alpha1 == 'nithwin':
            result='Marriage'
            pn1 = Popup(title='result',content=Label(text=result,font_size=40,font_name='virgo',color=(51/255,1,51/255,1)),size_hint=(None,None),size=(400,400))   
            pn1.open() 
            with open('namelist1.csv','a') as file:
                file.write(f'{alp1,alp2,result}\n')

        else:
            if any(char.isdigit() for char in alpha1) or any(char.isdigit() for char in alpha2):
                pa= Popup(title='Error',content=Label(text='   Enter \n   only \nAlphabets',
                font_name='virgo',color=(1,0,0,1),font_size=40),size=(400,400),size_hint=(None,None)) 
                pa.open()  
            
            elif alpha1 == '' and alpha2 == '':
                pa= Popup(title='Error',content=Label(text='Enter \n any \nName',
                font_name='virgo',color=(1,0,0,1),font_size=40),size=(400,400),size_hint=(None,None)) 
                pa.open()
            
            elif alpha1 == '' or alpha2 == '':
                pa= Popup(title='Error',content=Label(text='  Enter \nanother \n  Name',
                font_name='virgo',color=(1,0,0,1),font_size=40),size=(400,400),size_hint=(None,None)) 
                pa.open()
            
                    
            else:
                
                if True:
                    for i in alpha1:
                        for j in alpha2:
                            if i == j:
                                alpha1 = alpha1.replace(i, "", 1)
                                alpha2 = alpha2.replace(j, "", 1)
                                break

                    alpha1 = len(alpha1)
                    alpha2 = len(alpha2)

                    total = alpha1 + alpha2

                    if total > 0:
                        flames = ["Friends", "Lovers", "Affectionate", "Marriage", "Enemies", "Siblings"]
                        while len(flames) > 1:
                            r = total % len(flames)
                            n = r - 1
                            if n >= 0:
                                right = flames[:n]
                                left = flames[n + 1:]
                                flames = left + right
                            else:
                                flames = flames[:len(flames) - 1]
                        result = flames[0]
                    else:
                        result = "   Enter\n Different\n   Names"
                    pn = Popup(title='result',content=Label(text=result,font_size=40,font_name='virgo',color=(51/255,1,51/255,1)),size_hint=(None,None),size=(400,400))   
                    pn.open() 
                with open('namelist1.csv','a') as file:
                    file.write(f'{alp1,alp2,result}\n')
                with open('font.csv','a') as file:
                    file.write(f'{alp1,alp2,result}\n')

        
    def __init__(self,**kwargs):
        super(Funflames,self).__init__(**kwargs)
        lbl = Label(text="Fun Flames",
        pos=(350,500), 
        font_size=60,
        font_name='virgo',
        color=(0,1,1,1))

        self.tex = TextInput(hint_text='Enter Name 1',
        multiline=False,
        pos=(200,400),
        font_size=25,
        size_hint = (None,None),
        height = 50,
        width = 400
          )
        self.tex2 = TextInput(hint_text='Enter Name 2',
        multiline=False,
        pos=(200,250),
        font_size=25,
        size_hint=(None,None),
        height=50,
        width=400)

        btn = Button(text="Enter",
        pos=(250,100),
        size_hint=(None,None),
        height=50,
        width=300,
        color=(1,0,127/255,1)   ,
        font_size=30,
        font_name='virgo'
          )
        btn.bind(on_press=self.calculate)

        ch = CheckBox(
        pos=(700,380),
        size_hint=(0.1,0.5))
        ch.bind(active=self.on_checkbox)
        ch.text_input=self.tex

        btn2 = Button(text="Clear",
        pos=(250,20),
        size_hint=(None,None),
        height=50,
        width=300,
        color=(0,1,127/255,1)   ,
        font_size=30,
        font_name='virgo'
          )
        btn2.bind(on_press=self.clear)


        lbc = Label(text="hide",
        pos=(660,380),
        font_size=15,
        font_name='virgo',
        color=(1,0,0,1))

        ch2 = CheckBox(
        pos=(700,230),
        size_hint=(0.1,0.5))
        ch2.bind(active=self.on_checkbox)
        ch2.text_input=self.tex2

        lbc2 = Label(text="hide",
        pos=(660,230),
        font_size=15,
        font_name='virgo',
        color=(1,0,0,1))

        self.add_widget(btn2)
        self.add_widget(ch2)
        self.add_widget(lbc2)
        self.add_widget(lbc)
        self.add_widget(ch)
        self.add_widget(self.tex) 
        self.add_widget(self.tex2)       
        self.add_widget(lbl)
        self.add_widget(btn)

class Flames(App):
    def build(self):
        return Funflames()


if __name__=="__main__":
    Flames().run()