from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
// # replace "mymodels" with your own module name
from Tornadoes import tornadoes   

engine = create_engine('postgresql://postgres:GWFuture2022!M@localhost:5432/Tornadoes')
Session = sessionmaker(bind=engine)
session = Session()

my_object = tornadoes(om=value1, yr=value2,mo=calue3,dy=value4,date=value5,time=value6,tz=value7,st=value8,stf=value9,stn=value10,mag=value11,inj=value12,fat=value13,loss=value14,closs=value15,slat=value16,slon=value17,elat=value18,elon=value19,len=value20,wid=value21,ns=value22,sn=value23,sg=value24,f1=value25,f2=value26,f3=value27,f4=value28,fc=value29)
session.add(my_object)
session.commit()

