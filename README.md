# Nutikas Restorani Reserveerimissüsteem

## Programmi tutvustus:

Nutikas restoranisüsteem on mõeldud laudade interaktiivseks broneerimiseks. Esilehel avaneb võimalus lugeda lühiinfot äpi kohta ning samas ka edasi liikuda laua broneermise lehele.

Esimese asjana avaneb broneerimise lehel kuupäeva ning kellaaja valik (mida saab ka hiljem muuta). Mida eriti silmas pidada, on see, et demo andmebaasis on juhuslikult genereeritud esimese 30 päeva broneerimise info koos juhuslike broneeringu pikkustega (mida saab loomulikult ka enda vajaduse järgi sätestada). Kuid samas testiv kasutaja ise, valides kellaja vahemikust 8:00-21:45, saab automaatselt 90-minutilise broneeringu ning selle pikkuse muutmist ei ole implementeeritud.

Kui kuupäev ja kellaaeg on valitud, avaneb testijale ette restorani ruumiplaan, kus ei ole veel ühtegi lauda võimalik valida. Näha on hallikasrohelisi laudu, mis tähistavad potensiaalseid vabu laudu, ning punaseid laudu, mille broneerimine on eelnevalt valitud algusaja suhtes välistatud. 
Ruumiplaani kõrval avaneb testijale võimalus valida külastajate arv (1-6) ja soovitud mugavused (valikus on vaikne nurk, aknavaade ja lähedus laste mängualale). Külastajate arvu valimine on vajalik tegevus, et käivitada laudade soovitamine. Need soovitused on tähistatud erksa rohelise värviga ning on animeeritud pulseerima. Samas on tähele panna ka tekkinud oranže laudu, mis tähistavad laudade ebasobivust antud külastajate arvule. Siinpuhul kui toole on vähem kui külalisi, siis laudu ei saa broneerida. Sama kehtib ka siis, kui on 1-2 inimest, siis 4- ja 6-kohaline laud on neile liiga suur ning kui on 3 inimest, siis 6-kohaline laud on neile samuti liiga suur. Samas kui ühtegi muud vaba lauda ei ole, siis saab väike grupp ka suurema laua, kui on ette nähtud.
Seejärel saab valida spetsiaalseid mugavusi (valikus on vaikne nurk, aknavaade ja lähedus laste mängualale). Valida võib ükskõik kui palju. Samuti ei pea üldse valima. Tehes valiku, tekib laudadele ruumiplaanis rohelise värvi gradient, milles tumedamad värvid tähistavad soovidele paremini vastavaid laudu ning heledamad värvid soovidele vähem vastavaid. Kui laud soovidele üldse ei vasta, siis seda ei soovitata üldse.

Valiku tegemiseks tuleb lauale vajutada. Ning kui ollakse selles kindel, siis tuleb vajutada nuppu "Confirm the booking", milles avaneb broneeringu kinnitus kõikide andmetega. Seejärel saab kas tagasi minna või broneeringu lõplikult kinnitada. 

NB. Äpi lõplikus vormis viiksin ma kasutaja broneeringu kinnituse järkselt tagasi esilehele, kuid demo jaoks jäädakse samale lehele, et näha, kas valitud laud sai tõesti broneeritud (peaks olema nii küll).

Paremal üleval on UI element äpi teksti keele muutmiseks, kuid seda funktsiooni ei jõudnud ma veel implementeerida.



Kõigepealt alustasin ma backendiga, luues põhilised entity'd - table ja reservation. Ning seejärel lõin ma mõlemale Spring Bootile omase tüüpilise struktuuri. 
Selle osa põhiloogika kirjutasin ma ise, kuid samas on seal väga palju kordusi (palju korduvaid CRUD ja REST operatsioonide elemente), mistõttu pidasin loogiliseks kasutada seal AI genereerimist, et need kordused saaks kiiremini kirjutatud (kuid loomulikult valideerisin ma igat genereeritud rida isiklikult).
