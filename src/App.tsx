import React, { useEffect, useMemo, useRef, useState } from "react";
import kingdomKidsLogo from "./Image.png"

type ViewMode = "lyrics" | "both";
type SectionType = "chorus" | "verse" | "bridge" | "other";

type Song = {
  id: number;
  title: string;
  key: string;
  lyrics: string;
  chords: string;
  youtube?: string;
};


const songsData: Song[] = [
  {
    id: 1,
    title: "Cânt lui Dumnezeu glorie",
    key: "G",
    youtube: "https://www.youtube.com/watch?v=JKoox3ZWKXk&list=RDJKoox3ZWKXk&start_radio=1",
    lyrics: `
1. Cânt Domnului că mi-a făcut bine,
Lui Dumnezeu glorie!
Mi se bucură inima-n mine,
Lui Dumnezeu glorie!

R: 
Cânt lui Dumnezeu glorie
Și tot pământul să-I cânte
Lui Dumnezeu glorie!
El ne-a adus mântuire,
De-aceea-i cânt pe vecie
Lui Dumnezeu glorie.


2.
Cu natura-ntreagă îi cânt și eu
Lui Dumnezeu glorie!
Să-L slăvească munții și apele,
Lui Dumnezeu glorie!

3.
Cu cei ce-L iubesc în veci voi cânta
Lui Dumnezeu glorie!
Căci în slava veșnică vom intra,
Lui Dumnezeu glorie.
`,
    chords: `
1.
         G                C    G
Cânt Domnului că mi-a făcut bine,
               Em  D
Lui Dumnezeu glorie!
       G         C     G
Mi se bucură inima-n mine,
Em             D  G
Lui Dumnezeu glorie!

R:
       G
Cânt lui Dumnezeu glorie
    C                   G
Și tot pământul să-I cânte
Em            A   D
Lui Dumnezeu glorie!
    G              G7
El ne-a adus mântuire,
     C              G
De-aceea-i cânt pe vecie
Em            D   G
Lui Dumnezeu glorie.


2.
Cu natura-ntreagă îi cânt și eu
Lui Dumnezeu glorie!
Să-L slăvească munții și apele,
Lui Dumnezeu glorie!

3.
Cu cei ce-L iubesc în veci voi cânta
Lui Dumnezeu glorie!
Căci în slava veșnică vom intra,
Lui Dumnezeu glorie.
`,
  },
  {
    id: 2,
    title: "Doamne, numele-Ţi înalţ",
    key: "G",
    youtube:
      "https://www.youtube.com/watch?v=WSYW6SyqioA&list=RDWSYW6SyqioA&start_radio=1",
    lyrics: `
1.
Doamne, numele-Ţi înalţ,	
Doamne laudă-Ţi cânt Ţie,
Fericit sunt că Te am,
Fericit de-a Ta iertare.

R:
/: Tu ai venit pe pământ, să ne salvezi,
Sus pe cruce ai murit, iertaţi să fim,
De pe cruce în mormânt,
Din mormânt sus la cer,
Să fii înălţat mereu! :/                                 
`,
    chords: `
1.
G          C          D  C
  Doamne, numele-Ţi înalţ,	
G         C             D  C
  Doamne laudă-Ţi cânt Ţie,
G      C             D  C
  Fericit sunt că Te am,
G      C              D   C
  Fericit de-a Ta iertare.

R:
   G          C        D       C      G
  /: Tu ai venit pe pământ, să ne salvezi,
         C         D       C       G
Sus pe cruce ai murit, iertaţi să fim,
        C          D
De pe cruce în mormânt,
       B7           e
Din mormânt sus la cer,
        a7   D    G
Să fii înălţat mereu! :/                                 
`,
  },
  {
    id: 3,
    title: "Tu ești vrednic",
    key: "A",
    youtube: "",
    lyrics: `
R:   
Tu ești vrednic, Tu ești vrednic
Slavă, cinste să-Ți dăm!
Tu ești vrednic de-nchinare
Și să Te adorăm!

1.
Căci Tu ai creat Universul și omul,  
Viața din Tine primim;
Tu ești vrednic să-Ți dăm slavă
Și să-Ți mulțumim!

2. 
Căci Tu ai murit la Golgota pe cruce,
Sfântă iertare ne-ai dat;
Tu ești vrednic să-Ți dăm slavă,
Să fi adorat   
`,
    chords: `
R:   
 A                D
Tu ești vrednic, Tu ești vrednic
A      f#            E
Slavă, cinste să-Ți dăm!
A                D
Tu ești vrednic de-nchinare
A        E   A
Și să Te adorăm!

1.
     E               A
Căci Tu ai creat Universul și omul,
E                  A      
Viața din Tine primim;
A        A7      D          B7/D#
Tu ești vrednic să-Ți dăm slavă
A         E    A
Și să-Ți mulțumim!

2. 
Căci Tu ai murit la Golgota pe cruce,
Sfântă iertare ne-ai dat;
Tu ești vrednic să-Ți dăm slavă,  Să fi adorat   
`,
  },
  {
    id: 4,
    title: "Când eram doar un plod",
    key: "C",
    youtube: "https://youtu.be/C1fBEod-8jA?si=I3_e3s7jbUSTL0jE",
    lyrics: `
1.  
/: Când eram doar un plod fără chip
Ochii Tăi mă vedeau
În Cartea Ta de mult erau scrise
Zilele ce m-așteptau. : /

R:
Tu-mi știi viitorul și ești lângă mine
De ce să mă îngrijorez?     
Mi-ai promis că vei sta lângă mine,
Nicicând n-ai să mă părăsești.

2. 
/: De voi încerca să m-ascund de Tine
Nu voi reuși
Oriunde m-aș duce, chiar la marginea mării
Mâna Ta mă va călăuzi. : /

3.
/: Tu mă cunoști întru totul Doamne
Când stau jos sau mă ridic
Îmi cunoști toate căile mele	
Nu pot ascunde nimic. : /
`,
    chords: `
1.  
    C                  F 
/: Când eram doar un plod fără chip
G                C
Ochii Tăi mă vedeau
    C            F 
În Cartea Ta de mult erau scrise
    G            C
Zilele ce m-așteptau. : /

R:
        C               F   
Tu-mi știi viitorul și ești lângă mine
   G                C
De ce să mă îngrijorez?
C                     F          
Mi-ai promis că vei sta lângă mine,
     G                   C
Nicicând n-ai să mă părăsești.

2. 
/: De voi încerca să m-ascund de Tine
Nu voi reuși
Oriunde m-aș duce, chiar la marginea mării
Mâna Ta mă va călăuzi. : /

3.
/: Tu mă cunoști întru totul Doamne
Când stau jos sau mă ridic
Îmi cunoști toate căile mele	
Nu pot ascunde nimic. : /
`,
  },
  {
    id: 5,
    title: "Ce bucurie am în Isus",
    key: "C",
    youtube: "https://youtu.be/MENlE86ora4?si=mQeW3YrZv6-PjUff",
    lyrics: `
1.
Ce bucurie am în Isus!
O viață nouă El mi-a adus.
Pentru vecie m-a mântuit
Și moștenire mi-a dăruit.

R:
În veci cânta-voi că-s fericit:
Isus pe cruce m-a mântuit!
În veci aceasta eu voi cânta:
„Te-ador, Isuse, ești viața mea!”

2.
Cu bucurie inima mea
Una cu Domnul să fie-ar vrea.
El pace sfântă îmi dă din plin,
Înviorat sunt prin har divin.

3.
Ce fericit sunt și liniștit,
Când e cu mine sunt ocrotit.
Eu știu prea bine și spun mereu:
„Domnul e viața și e al meu!”
`,
    chords: `
1.
        C   F      C
Ce bucurie am în Isus!
         a   D        Gsus G
O viață nouă El mi-a adus.
          C   F       C
Pentru vecie m-a mântuit
 a       d     G      C
Și moștenire mi-a dăruit.

R:
           C        F      C
În veci cânta-voi că-s fericit:
          a    D       Gsus G
Isus pe cruce m-a mântuit!
          C     F          C
În veci aceasta eu voi cânta:
   a        d     G          C
„Te-ador, Isuse, ești viața mea!”

2.
Cu bucurie inima mea
Una cu Domnul să fie-ar vrea.
El pace sfântă îmi dă din plin,
Înviorat sunt prin har divin.

3.
Ce fericit sunt și liniștit,
Când e cu mine sunt ocrotit.
Eu știu prea bine și spun mereu:
„Domnul e viața și e al meu!”
`,
  },
  {
    id: 6,
    title: "Domnul îmi este adăpost",
    key: "D",
    youtube: "https://youtu.be/8yQsTWsXHEw?si=XiGPyaIT-OmI2xKU",
    lyrics: `
1.   
Domnul îmi este adăpost,
Cetate tare-n vreme rea!
Deşi e valul furios,
Îmi e scutită inima.
                  
R: 
Da, eu mă-ncred în Domnul
Cetatea mea, cetatea mea, Cetatea mea...
O, Isuse eu Ţie mă-ncredinţez,
Cetate tare-n vreme rea.


2.
Scut de arşiţa soarelui,
Cetate tare-n vreme rea!
E ca lumina farului,
Ce străluceşte-n noaptea grea.


3.
Cu-al Tău cuvânt marea alini,
Cetate tare-n vreme rea!
Sufletu-mi l-acest scut să vii
Şi nici un rău nu s-a-ntâmpla.


4.
Tu eşti a mea mântuire,
Cetate tare-n vreme rea!
Tu-mi dai credinţă, iertare,
M-aşteaptă-n cer fericirea.
`,
    chords: `
1.
    D
Domnul îmi este adăpost,
                     A
Cetate tare-n vreme rea!
  D             Bm
Deşi e valul furios,
                 D
Îmi e scutită inima.

R:
    G                   
Da, eu mă-ncred în Domnul
   D            A            D     D7
Cetatea mea, cetatea mea, Cetatea mea...
   G                 D     Bm
O, Isuse eu Ţie mă-ncredinţez,
   D            A    D
Cetate tare-n vreme rea.


2.
Scut de arşiţa soarelui,
Cetate tare-n vreme rea!
E ca lumina farului,
Ce străluceşte-n noaptea grea.


3.
Cu-al Tău cuvânt marea alini,
Cetate tare-n vreme rea!
Sufletu-mi l-acest scut să vii
Şi nici un rău nu s-a-ntâmpla.


4.
Tu eşti a mea mântuire,
Cetate tare-n vreme rea!
Tu-mi dai credinţă, iertare,
M-aşteaptă-n cer fericirea.
`,
  },
  {
    id: 7,
    title: "Ridică-te, oștirea lui Cristos",
    key: "D",
    youtube: "https://www.youtube.com/watch?v=4QQ0-0g6v6Y",
    lyrics: `
1.
Ridică-te, oștirea lui Cristos, 
La chemarea Lui răspunde!
Chiar cei mai slabi să spună „Tari suntem”
Întăriți de-a Lui putere”.
Iar prin credință și-adevăr, Minciuna celui rău surpând,
Vom căuta, de dragoste mânați, 
Din foc pe mulți să-i scoatem.

2.
De dragul sufletelor prinse-n laț,
Noi luptăm cu-amăgitorul,
Iar sabia ce vindecă răniți,
Mânuim cu vrednici—e.
Chiar în vâltoarea luptei prinși,
Rămânem ferm încredințați:
Cristos va lua, răsplata jertfei Lui, Neamurile moștenire.

3.
Vino și vezi iubirea, mila Lui,   
Când Cristos e frânt pe cruce.
Apoi dușmanii Lui ce zac zdrobiți
Călcând din moarte EL învi—e.
El se ivește din mormânt
Și-ncepe-al biruinței cânt
Ce curge-adânc și crește neoprit Până-n ziua veșnici—ei.  

4.
O, Sfinte Duh, dă har să biruim  
Orice piedică pe cale.
Și cu credință, alergând spre țel,
Să primim cununa slavei.
În timp ce-un nor de martori vii
Vestesc a harului isprăvi,
Tânjim și noi s-ajungem ziua când  Cu Isus vom sta în slavă.
`,
    chords: `
1.
  G/A  D           G/B    A/C#
Ridică-te, oștirea lui Cristos, 
      D/F#   G      A  D
La chemarea Lui răspunde!
      G/A       D             G/B   A/C#
Chiar cei mai slabi să spună „Tari suntem”
    D/F#       G    A  D
Întăriți de-a Lui putere”.
     D/F#    G    D/F#   A       D/F#  G     D      A
Iar prin credință și-adevăr, Minciuna celui rău surpând,
    G/A D          G/B    A/C#
Vom căuta, de dragoste mânați, 
    D/F#   G            A  D
Din foc pe mulți să-i scoatem.

2.
De dragul sufletelor prinse-n laț,
Noi luptăm cu-amăgitorul,
Iar sabia ce vindecă răniți,
Mânuim cu vrednici—e.
Chiar în vâltoarea luptei prinși,
Rămânem ferm încredințați:
Cristos va lua, răsplata jertfei Lui, Neamurile moștenire.

3.
Vino și vezi iubirea, mila Lui,   
Când Cristos e frânt pe cruce.
Apoi dușmanii Lui ce zac zdrobiți
Călcând din moarte EL învi—e.
El se ivește din mormânt
Și-ncepe-al biruinței cânt
Ce curge-adânc și crește neoprit Până-n ziua veșnici—ei.  

4.
O, Sfinte Duh, dă har să biruim  
Orice piedică pe cale.
Și cu credință, alergând spre țel,
Să primim cununa slavei.
În timp ce-un nor de martori vii
Vestesc a harului isprăvi,
Tânjim și noi s-ajungem ziua când  Cu Isus vom sta în slavă.    
`,
  },
 {
    id: 8,
    title: "Valoarea mea nu stă-n averi",
    key: "C",
    youtube: "https://youtu.be/IrnfxwkKu_E?si=sCenh4Tz8lNtBBHt",
    lyrics: `
1.
Valoarea mea nu stă-n averi,
Sau ale trupului puteri,
Ci-n ale dragostei dureri, la Calvar.

2.
Valoare n-am că-s înzestrat,
Nici că-s înfrânt sau înălţat,
Ci-n sângele cel sfânt, vărsat, la Calvar.

R:
Doar Cristos mi-e bucurie,
Apă vie, și comoara mea!
Mă încred în El, nu-n altul,
Căci numai El îmi umple inima!

3.
Precum pier florile din câmp,
Se duc și ani, și faimă-n vânt,
Dar veșnicia stă chemând, la Calvar.

4.
Cum să mă laud cu averi,
Cu cele omenești ce pier?
Mă laud că-L cunosc pe El, la Calvar.

REFREN  

5.
Două minuni declar voios:
Nevrednic sunt, dar valoros,
Iar prețu-mi l-a plătit Cristos, la Calvar!
`,
    chords: `
1.
   C            F       C
Valoarea mea nu stă-n averi,
     C        F     C
Sau ale trupului puteri,
      C        G/B   Am    F      C
Ci-n ale dragostei dureri, la Calvar.

2.
Valoare n-am că-s înzestrat,
Nici că-s înfrânt sau înălţat,
Ci-n sângele cel sfânt, vărsat, la Calvar.

R:
 F                 G   Am
Doar Cristos mi-e bucurie,
     F         C     G
Apă vie, și comoara mea!
F            G         Am
Mă încred în El, nu-n altul,
          C/E     F     G  C
Căci numai El îmi umple inima!

3.
Precum pier florile din câmp,
Se duc și ani, și faimă-n vânt,
Dar veșnicia stă chemând, la Calvar.

4.
Cum să mă laud cu averi,
Cu cele omenești ce pier?
Mă laud că-L cunosc pe El, la Calvar.

REFREN  

5.
Două minuni declar voios:
Nevrednic sunt, dar valoros,
Iar prețu-mi l-a plătit Cristos, la Calvar! 
`,
  },
  {
  id: 9,
  title: "Sunt un pribeag",
  key: "Bm",
  youtube: "https://www.youtube.com/watch?v=hsZhryhQTac&list=RDhsZhryhQTac&start_radio=1",
  lyrics: `
1.
Sunt un pribeag fără de ţară,
Rătăcitor prin lung pustiu.
Dar am în ceruri o comoară
Şi ţara mea e-n veşnicii.

R.
Mă-ndrept spre cer să-L văd pe Domnul
Să nu mai fiu un pelegrin!
Căci după ce-am să trec Iordanul
Se va sfârşi al meu suspin!

2.
Tu vezi ce grea mi-e înaintarea
Mă lupt să biruiesc mereu
Un dor nestins mă cheamă acasă
E dorul după Dumnezeu.

3.
Voi lepăda a mea povară
Eliberat sub crucea grea
Nădejdea mea nu o să moară
Eu voi intra-n odihna Sa!`,
  chords: `
1.
           Bm
Sunt un pribeag fără de ţară,
      Em       F#      Bm
Rătăcitor prin lung pustiu.
          Bm
Dar am în ceruri o comoară
         Em   F#    Bm
Şi ţara mea e-n veşnicii.

R. 
                G       A       D
Mă-ndrept spre cer să-L văd pe Domnul
           G  A        D F#7
Să nu mai fiu un pelegrin!
           F#                Bm
Căci după ce-am  să trec Iordanul
          Em   F#       Bm
Se va sfârşi  al meu suspin!

2.
Tu vezi ce grea mi-e ‘naintarea
Mă lupt să biruiesc mereu
Un dor nestins mă cheamă acasă
E dorul după Dumnezeu.

3.
Voi lepăda a mea povară
Eliberat sub crucea grea
Nădejdea mea nu o să moară
Eu voi intra-n odihna Sa!
`,
},
  {
  id: 10,
  title: "Isus e Rege",
  key: "C",
  youtube: "",
  lyrics: `
R.
Isus e Rege pe tot pământul,
Azi mă închin în faţa Lui:
În faţa Lui.

1.
Toată viaţa Îi voi cânta,
Căci vreau s-ajung în ţara Sa.

2.
Laud pe Domnul şi-L preamăresc,
Laud pe Domnul, căci Îl iubesc.

Fil 2:9-10`,
  chords: `
R.
  C      Am   F        G
/:Isus e Rege pe tot pământul,
C         Am  F        G
Azi mă închin în faţa Lui:/
        C Am F G
În faţa Lui.

1.
C       Am   F        G
Toată viaţa Îi voi cânta,
 C             Am  F       G
Căci vreau s-ajung în ţara Sa.

2. 
Laud pe Domnul şi-L preamăresc,
Laud pe Domnul, căci Îl iubesc.

Fil 2:9-10
`,
},
 {
  id: 11,
  title: "Doamne, numele-Ţi înalţ",
  key: "G",
  youtube: "",
  lyrics: `1.
Doamne, numele-Ţi înalţ,
Doamne laudă-Ţi cânt Ţie,
Fericit sunt că Te am,
Fericit de-a Ta iertare.

R.
Tu ai venit pe pământ să ne salvezi,
Sus pe cruce ai murit, iertaţi să fim,
De pe cruce în mormânt,
Din mormânt sus la cer,
Să fii înălţat mereu!

Fil 2:6-11.`,
  chords: `
1.
G           C           D C
   Doamne, numele-Ţi înalţ,
G          C            D C
   Doamne laudă-Ţi cânt Ţie,
G       C              D C
   Fericit sunt că Te am,
G       C              D  C
   Fericit de-a Ta iertare.

R.
 G          C        D       C       G
/: Tu ai venit pe pământ, să ne salvezi,
         C         D       C       G
Sus pe cruce ai murit, iertaţi să fim,
        C          D
De pe cruce în mormânt,
        B7          E
Din mormânt sus la cer,
        Am7 D    G
Să fii înălţat mereu! :/



Fil 2:6-11.
`,
},
{
  id: 13,
  title: "E-o minune când soarele apune",
  key: "C",
  youtube: "",
  lyrics: `1.
E-o minune când soarele apune,
Minune din veşnicii.
Dar mai mare-i minunea din inimă,
Minunea că El m-a iubit.

R.
Minunat e Domnul meu,
Mai minunat e El,
Decât orice pe pământ,
Minunat e Domnul sfânt!

2.
E-o minune şi vara şi iarna
Şi cerul înstelat;
Dar mai mare-i minunea din inimă,
Minunea că El m-a salvat.

3.
E-o minune întreaga-mi făptură,
Minune din veşnicii.
Dar mai mare-i minunea din inimă,
Minunea că El va veni.

Ps 19, 97`,
  chords: `
1.
       C                  Dm7
E-o minune când soarele apune,
   G             C
Minune din veşnicii.
                            F
Dar mai mare-i minunea din inimă,
     G                 C
E minunea că El m-a iubit.

R.
     C           Dm7
Minunat e Domnul meu.
     G        C
Mai minunat e El
                  F
Decât orice pe pământ
    G              C
Minunat e Domnul sfânt!

2.
E-o minune şi vara şi iarna
Şi cerul înstelat;
Dar mai mare-i minunea din inimă,
Minunea că El m-a salvat.

3.
E-o minune întreaga-mi făptură,
Minune din veşnicii.
Dar mai mare-i minunea din inimă,
Minunea că El va veni.

Ps 19, 97
`,
},
{
  id: 14,
  title: "Domnul ne-a creat după chipul Său",
  key: "E",
  youtube: "",
  lyrics: `1.
Domnul ne-a creat după chipul Său,
El ne-a învăţat să urâm ce-i rău,
Să nu ne mai întoarcem pe unde am fost,
Că n-are nici un rost.
Nu mai vrem în lume să rătăcim,
Vrem de azi viaţa cu El s-o trăim,
Tot ce-avem să punem în mâna Lui,
În mâna Domnului.

R.
Căci dacă trăim,
Pentru Domnul trăim,
Şi dacă murim,
Pentru Domnul murim.
Fie că trăim, fie că murim,
Noi suntem ai Lui.

2.
Nu putem să ştim dacă mâine în zori
Va fi o zi cu soare ori o zi cu nori
Ştim însă ca Domnul va fi cu noi
La bine şi-n nevoi.
Hotărâţi-nainte vom alerga
Spre ceruri zi de zi ne vom înălţa
Nici o clipă nu vom privi-napoi
Căci Domnul e cu noi!
`,
  chords: `
1.
             Fm#               B
Domnul ne-a creat după chipul Său
             E               Cm#
El ne-a învăţat să urâm ce e rău
               Fm#                 B
Să nu ne mai întoarcem pe unde am fost
                  E   B
Că n-are nici un rost.

Nu mai vrem în lume să rătăcim
Vrem de azi viaţa cu El s-o trăim
Tot ce-avem să punem în mâna Lui
În mâna Domnului.

R.
               E
/:Căci dacă trăim,
                 B
Pentru Domnul trăim
          Cm#
Şi dacă murim,
                 A
Pentru Domnul murim.
         E             B
Fie că trăim, fie că murim
               E  B
Noi suntem ai Lui. :/

2.
Nu putem să ştim dacă mâine în zori
Va fi o zi cu soare ori o zi cu nori
Ştim însă ca Domnul va fi cu noi
La bine şi-n nevoi.
Hotărâţi-nainte vom alerga
Spre ceruri zi de zi ne vom înălţa
Nici o clipă nu vom privi-napoi
Căci Domnul e cu noi!

Rom 14:8
`,
},
{
  id: 16,
  title: "Cel ce stă sub ocrotirea",
  key: "A",
  youtube: "",
  lyrics: `1.
Cel ce stă sub ocrotirea Celui Preaînalt,
La umbra Celui Atotputernic,
Face din El loc de scăpare, căci Domnul sfânt:
E Dumnezeul meu în care mă-ncred!

R.
O mie să cadă alături de tine,
Şi zece mii la dreapta ta de vor cădea,
Cu ochii priveşte să vezi răsplătirea acelui rău,
Doar harul Său te va salva!

2.
Să nu te temi de groaza din noaptea cea grea,
Nici de săgeata ce zboară ziua,
De ciuma rea din întuneric, să nu te temi,
Căci Domnul îţi va păzi cărarea.

Ps 91`,
  chords: `
1.
        A E        Fm#               A
Cel ce stă sub ocrotirea Celui Preaînalt,
          Bm   A     G     E
La umbra Celui Atotputernic,
          A E          D                  A
Face din El loc de scăpare, căci Domnul sfânt
          Fm#          D E       A
/: E Dumnezeul meu în care mă-ncred! :/


R.
   A           Fm#
O mie să cadă alături de tine
         D             B7         Esus E
Şi zece mii la dreapta ta de vor cădea,
    A                Fm#                      D
Cu ochii priveşte să vezi răsplătirea acelui rău,
            E           A
Doar harul Său te va salva!


2.
Să nu te temi de groaza din noaptea cea grea,
Nici de săgeata ce zboară ziua,
De ciuma rea din întuneric, să nu te temi,
/:Căci Domnu-ţi va păzi cărarea de ea! :/


Ps 91

`,
},
{
  id: 17,
  title: "Destinul tău e să învingi",
  key: "D",
  youtube: "",
  lyrics: `1.
Destinul tău e să învingi
Când eşti căzut să te ridici
Destinul tău l-a scris cândva Isus
Numele tău de mult e scris
În cartea vieţii din Paradis
Destinul tău e cerul Său, să ştii.

R.
Nu suntem aici statornici
O ţară-avem şi ea e sus
Calea se sfârşeşte-acolo
Când vom vedea toţi pe Isus!

2.
Deci să te porţi cum e cinstit
Cu Tatăl tău ce te-a iubit
Şi te-a plătit cu mare preţ, să ştii.
Pe braţul meu Eu te-am purtat
Şi-am să te port neîncetat
El, Dumnezeu, spune aşa în cartea Sa.

Fil 4:3`,
  chords: `
1.
          G          A
Destinul tău e să învingi
            D           Bm
Când eşti căzut să te ridici
         Em                A    D
Destinul tău l-a scris cândva Isus
        G               A
Numele tău de mult e scris
           D             Bm
În cartea vieţii din Paradis
         Em           A        D
Destinul tău e cerul Său, să ştii.


R.
       D           A
Nu suntem aici statornici
        G           A
O ţar-avem şi ea e sus
      D              A
Calea se sfârşeşte-acolo
            G        A    D
Când vom vedea toţi pe Isus :/


2.
Deci să te porţi cum e cinstit
Cu Tatăl tău ce te-a iubit
Şi te-a plătit cu mare preţ, să ştii.
Pe braţul meu Eu te-am purtat
Şi-am să te port neîncetat
El, Dumnezeu, spune aşa în cartea Sa.

Fil 4:3
`,
},
{
  id: 21,
  title: "De trăiești cu Domnul tău mereu",
  key: "A",
  youtube: "",
  lyrics: `1.
De trăiești cu Domnul tău mereu,
Fericit îți este traiul tău;
/:Pe-ale vieții tale căi,
Peste dealuri și prin văi,
El te duce-n sfinte fericiri:/

2.
Lasă soarta ta în mâna Lui,
Viața ta să fie-a Domnului!
/:Să-I predai tot ce-i al tău,
Să-mplinești Cuvântul Său!
El te duce-n sfinte fericiri:/

3.
Când ispita te va încerca
Și durerea te va apăsa,
/:Nici atunci nu șovăi!
El și-atunci te va iubi;
El te duce-n sfinte fericiri:/`,
  chords: `
1.
       A                    E
De trăiești cu Domnul tău mereu,
                         A
Fericit iți este traiul tău;
          A          Fm#
/:Pe-ale vieții tale căi,
       D              Bm
Peste dealuri și prin văi,
       E                 A
El te duce-n sfinte fericiri:/

2.
Lasă soarta ta in mâna Lui,
Viața ta să fie-a Domnului!
/:Să-I predai tot ce-i al tău,
Să-mplinești Cuvântul Său!
El te-a duce-n sfinte fericiri:/

3.
Când ispita te va încerca
Și durerea te va apăsa,
/:Nici atunci nu șovăi!
El și-atunci te va iubi;
El te-a duce-n sfinte fericiri:/

`,
},
{
  id: 22,
  title: "Doamne, bunătatea Ta",
  key: "D",
  youtube: "",
  lyrics: `1.
Doamne, bunătatea Ta
Îmi cuprinde inima
Și mă face fericit,
Domnul meu iubit.
De cu zori până-n apus
Numai harul Tău, Isus,
Îmi inundă inima
Și viața mea.

R.
N-ai în lume-asemănare,
Nu e nimenea sub soare,
Nici în cer, nici pe pământ
Cât ești Tu de sfânt!
Dragostea-Ți mă copleșește,
Pacea Ta mă liniștește,
Harul Tău îmi dă avânt
Tot mai mult să-Ți cânt.

2.
Norii negri când apar
Tu îmi ești un veșnic far,
Drumul mi-l călăuzești
Și mă ocrotești.

3.
Doamne, pune-n gura mea.  
Totdeauna lauda Ta,
Numai Ție să Îți cânt
Pe acest pământ.
Iar când zorii vor veni,
Numele Tău voi slăvi,
Asta-i fericirea mea: Să cânt slava Ta!
`,
  chords: `
1.
D           Em7        A           D
Doamne, bunătatea Ta, Îmi cuprinde inima
D          Em7      G      A     D
Și mă face fericit, Domnul meu iubit.
D            Em7        A           D
De cu zori până-n apus Numai harul Tău, Isus,
D           Em7  A         D
Îmi inundă inima și viaţa mea.

R.
G
N-ai în lume-asemănare,
D
Nu e nimenea sub soare,
A
Nici în cer, nici pe pământ
D                D7
Cât eşti Tu de sfânt!
G
Dragostea-Ți mă copleşeşte,
D
Pacea Ta mă linişteşte,
A
Harul Tău îmi dă avânt,
G        A          D
Tot mai mult să-Ți cânt.

2.
Norii negrii când apar
Tu îmi ești un veşnic far,
Drumul mi-l călăuzeşti
Și mă ocroteşti.
Și prin arșiță Îți cânt
Numai Ție, Doamne sfânt,
Că-n izvorul Tău ceresc
Sufletu-mi sfințesc.

3.
Doamne, pune-n gura mea.  
Totdeauna lauda Ta,
Numai Ție să Îți cânt
Pe acest pământ.
Iar când zorii vor veni,
Numele Tău voi slăvi,
Asta-i fericirea mea: Să cânt slava Ta!

`,
},
{
  id: 23,
  title: "Eu eram în lume pierdut",
  key: "G",
  youtube: "",
  lyrics: `1.
Eu eram în lume pierdut
Și fără adăpost
Dar când în față mi-ai apărut
Eu mi-am găsit un rost.

R.
Îți mulțumesc din inimă
Iubite Salvator
De mii de ori Tu m-ai scăpat
Și mi-ai dat ajutor.

2.
De multe ori mi s-a întâmplat
Să fiu fără ajutor
De-atâtea ori Tu m-ai scăpat
De-aceea-Ți sunt dator.

3.
Eu sunt dator să-Ți mulțumesc
Pentru iubirea Ta
Isuse, ce mult Te iubesc
Iubesc venirea Ta.`,
  chords: `
1.
G             Am7
  Eu eram în lume pierdut
D             G
  Şi fără adăpost
                         Am7
  Dar când în faţă mi-ai apărut
D                   G
  Eu mi-am găsit un rost.

R.
G                   Am7
  Îţi mulţumesc din inimă
D              G
  Iubite Salvator
                    Am7
  De mii de ori tu m-ai scăpat
D                  G
  Şi mi-ai dat ajutor.

2.
De multe ori mi s-a întâmplat
Să fiu fără ajutor
De-atâtea ori tu m-ai scăpat
De-aceea-Ţi sunt dator.

3.
Eu sunt dator să-Ţi mulţumesc
Pentru iubirea Ta
Isuse, ce mult Te iubesc
Iubesc venirea Ta.

`,
},  
];

// ---------- YouTube helpers ----------
function isYouTubeUrl(url?: string) {
  if (!url) return false;
  return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function toYouTubeEmbedUrl(url: string) {
  const trimmed = url.trim();

  const embedMatch = trimmed.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) return `https://www.youtube.com/embed/${embedMatch[1]}`;

  const shortMatch = trimmed.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const watchMatch = trimmed.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return "";
}

const MOLDOVA_TRICOLOR_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg";


// ---------- Section detection + chorus bold ----------
function detectSectionLabel(line: string): {
  isLabel: boolean;
  type: SectionType;
  labelText: string;
} {
  const s = line.trim();
  if (!s) return { isLabel: false, type: "other", labelText: "" };

  // ✅ Chorus: must be the FULL line
  if (/^(R|R:|R\.|Ref|Ref\.|Refren|Chorus)\s*$/i.test(s)) {
    return { isLabel: true, type: "chorus", labelText: s };
  }

  // ✅ Verse numbers like "1." or "2:"
  if (/^\d+\s*[:.]?$/.test(s)) {
    return { isLabel: true, type: "verse", labelText: s };
  }

  if (/^bridge\s*$/i.test(s)) {
    return { isLabel: true, type: "bridge", labelText: "Bridge" };
  }

  return { isLabel: false, type: "other", labelText: "" };
}

const isPhonePortrait = () => {
  if (typeof window === "undefined") return false;
  const w = window.innerWidth;
  const h = window.innerHeight;
  return w < 520 && h > w;
};

/**
 * Render text with:
 * - normal mode: pre-wrap (wraps)
 * - mono mode (lyrics+chords): pre (NO WRAP) + horizontal scroll
 */
function renderWithSectionStyling(
  text: string,
  opts: { stageMode: boolean; dark: boolean; autoBoldChorus: boolean; mono?: boolean }
) {
  const lines = text.split("\n");
  let currentSection: SectionType = "other";
  const isPhone = typeof window !== "undefined" && window.innerWidth < 420;

  const innerStyle: React.CSSProperties = {
    whiteSpace: opts.mono ? "pre" : "pre-wrap",
    fontFamily: opts.mono
      ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      : "Arial, sans-serif",
    fontSize: opts.stageMode ? 28 : isPhone ? 14 : 16,
    lineHeight: opts.stageMode ? 1.7 : opts.mono ? 1.45 : 1.6,
    color: opts.dark ? "#fff" : "#000",
    marginTop: 14,
    overflowWrap: opts.mono ? "normal" : "anywhere",
    wordBreak: "normal",
    display: opts.mono ? "inline-block" : "block",
    minWidth: opts.mono ? "max-content" : undefined,
  };

  const labelStyle = (type: SectionType): React.CSSProperties => ({
    display: "inline-block",
    padding: opts.stageMode ? "6px 12px" : "4px 10px",
    borderRadius: 999,
    fontWeight: 900,
    margin: "10px 0 6px",
    letterSpacing: 0.5,
    background: opts.dark
      ? "rgba(255,255,255,0.12)"
      : type === "chorus"
      ? "rgba(11,95,255,0.12)"
      : "rgba(0,0,0,0.06)",
    color: opts.dark ? "#fff" : type === "chorus" ? "#0B5FFF" : "#111",
  });

  const outerStyle: React.CSSProperties = opts.mono
    ? { overflowX: "auto", WebkitOverflowScrolling: "touch" }
    : {};

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        {lines.map((line, idx) => {
          const { isLabel, type, labelText } = detectSectionLabel(line);

          if (isLabel) {
            currentSection = type;
            return (
              <div key={idx}>
                <span style={labelStyle(type)}>{labelText}</span>
              </div>
            );
          }

          const shouldBold =
            opts.autoBoldChorus && currentSection === "chorus" && line.trim().length > 0;

          return (
            <div
              key={idx}
              style={{
                fontWeight: shouldBold ? 900 : 500,
                letterSpacing: opts.mono ? "-0.3px" : undefined,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Transpose helpers ----------
const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTES_FLAT  = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const ENHARMONIC_TO_SHARP: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Cb: "B",
  Fb: "E",
  "E#": "F",
  "B#": "C",
};

// Cleanup uncommon/ugly spellings after output selection
const BAD_ENHARMONICS: Record<string, string> = {
  "Eb#": "E",
  "B#": "C",
  "Cb": "B",
  "Fb": "E",
};

function normNoteToSharp(n: string) {
  return ENHARMONIC_TO_SHARP[n] ?? n;
}

function fixEnharmonic(n: string) {
  return BAD_ENHARMONICS[n] ?? n;
}

function transposeNote(note: string, semis: number, preferFlats: boolean) {
  const base = normNoteToSharp(note);
  const idx = NOTES_SHARP.indexOf(base);
  if (idx < 0) return note;

  const next = (idx + semis + 1200) % 12;
  const out = preferFlats ? NOTES_FLAT[next] : NOTES_SHARP[next];
  return fixEnharmonic(out);
}

function transposeChordToken(token: string, semis: number, preferFlats: boolean) {
  const m = token.match(/^([A-G])([#b]?)(.*)$/);
  if (!m) return token;

  const root = m[1] + (m[2] || "");
  let rest = m[3] || "";

  // Handle slash bass notes (now supports /C# properly because regex captures it)
  if (rest.includes("/")) {
    const [beforeSlash, afterSlash] = rest.split("/", 2);

    // parse bass: letter + optional accidental + anything else
    const bassMatch = afterSlash.match(/^([A-G])([#b]?)(.*)$/);
    if (bassMatch) {
      const bassRoot = bassMatch[1] + (bassMatch[2] || "");
      const bassRest = bassMatch[3] || "";

      const newBass = transposeNote(bassRoot, semis, preferFlats);

      // IMPORTANT: if bassRest starts with stray accidentals, drop them
      const cleanedBassRest = bassRest.replace(/^[#b]+/, "");

      rest = `${beforeSlash}/${newBass}${cleanedBassRest}`;
    }
  }

  const newRoot = transposeNote(root, semis, preferFlats);
  return `${newRoot}${rest}`;
}


// Matches chords even if they end with # (A/C#, F/A# etc)
// Keeps separators so spacing is preserved
const CHORD_TOKEN_RX =
  /(^|[^A-Za-z0-9_])([A-G])([#b]?)(?:(maj|min|dim|aug|sus|add|m)?([0-9]{0,2})?)?(?:\/([A-G])([#b]?))?(?=$|[^A-Za-z0-9_])/g;




// Safety pass (optional but harmless): fix any leftover weird spellings if they appear
function normalizeSpellings(text: string) {
  return text
    .replace(/\bEb#\b/g, "E")
    .replace(/\bFb\b/g, "E")
    .replace(/\bB#\b/g, "C")
    .replace(/\bCb\b/g, "B");
}

function transposeText(text: string, semis: number, preferFlats: boolean) {
  if (semis === 0) return text;

  return text.replace(
    CHORD_TOKEN_RX,
    (full, lead, letter, accidental, qual, digits, bassLetter, bassAcc) => {
      const token =
        `${letter}${accidental || ""}` +
        `${qual || ""}${digits || ""}` +
        (bassLetter ? `/${bassLetter}${bassAcc || ""}` : "");

      return `${lead}${transposeChordToken(token, semis, preferFlats)}`;
    }
  );
}

function transposeKeyLabel(key: string, semis: number, preferFlats: boolean) {
  const m = key.match(/^([A-G])([#b]?)(m)?$/i);
  if (!m) return key;

  const root = m[1].toUpperCase() + (m[2] || "");
  const minor = m[3] ? "m" : "";

  const newRoot = transposeNote(root, semis, preferFlats);
  return `${newRoot}${minor}`;
}
// ---------- Chord extraction + degree ordering + diagrams ----------

function extractChordTokens(text: string) {
  const found: string[] = [];
  const seen = new Set<string>();

  const rx =
    /(^|[^A-Za-z0-9_])([A-G])([#b]?)(?:(maj|min|dim|aug|sus|add|m)?([0-9]{0,2})?)?(?:\/([A-G])([#b]?))?(?=$|[^A-Za-z0-9_])/g;

  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    const token =
      `${m[2]}${m[3] || ""}${m[4] || ""}${m[5] || ""}` +
      (m[6] ? `/${m[6]}${m[7] || ""}` : "");

    if (!token || seen.has(token)) continue;
    seen.add(token);
    found.push(token);
  }

  return found;
}

function chordRoot(token: string) {
  const m = token.match(/^([A-G])([#b]?)/);
  return m ? m[1] + (m[2] || "") : "";
}

function chordIsMinor(token: string) {
  return /^([A-G])([#b]?)(m)(?!aj)/i.test(token);
}

function stripSlash(token: string) {
  return token.split("/")[0];
}

const MAJOR_DEGREE_OFFSETS = [0, 2, 4, 5, 7, 9, 11];

// ✅ add this (natural minor)
const MINOR_DEGREE_OFFSETS = [0, 2, 3, 5, 7, 8, 10];


function degreeRootNote(
  root: string,
  degree: number,
  preferFlats: boolean,
  isMinor: boolean
) {
  const idx = noteIndex(root);
  const offsets = isMinor ? MINOR_DEGREE_OFFSETS : MAJOR_DEGREE_OFFSETS;
  const off = offsets[degree - 1];
  const out = preferFlats
    ? NOTES_FLAT[(idx + off) % 12]
    : NOTES_SHARP[(idx + off) % 12];
  return fixEnharmonic(out);
}

function chordsByDegreeOrder(
  used: string[],
  displayKey: string,
  preferFlats: boolean
) {
  const { root, minor } = splitKeyLabel(displayKey);

  const order = minor
    ? [1, 4, 5, 6, 7, 3]   // ✅ minor keys
    : [1, 4, 5, 6, 2, 3]; // ✅ major keys

  const byRoot = new Map<string, string[]>();
  used.forEach((c) => {
    const r = chordRoot(stripSlash(c));
    if (!byRoot.has(r)) byRoot.set(r, []);
    byRoot.get(r)!.push(c);
  });

  return order
    .map((d) => {
      const r = degreeRootNote(root, d, preferFlats, minor);
      const list = byRoot.get(r) || [];
      if (!list.length) return null;

      // minor expectations
      const wantMinor = minor
        ? d === 1 || d === 4
        : d === 2 || d === 3 || d === 6;

      return list.find((c) => chordIsMinor(c) === wantMinor) || list[0];
    })
    .filter(Boolean) as string[];
}

function ChordDiagram({ chord, dark }: { chord: string; dark: boolean }) {
  // parse chord root + minor
  const mm = chord.match(/^([A-G])([#b]?)(m)?/);
  const root = mm ? mm[1] + (mm[2] || "") : "C";
  const isMinor = !!(mm && mm[3]);

  // open-chord shapes (low E → high E). 0 means open; numbers are frets.
  const openChords: Record<string, number[]> = {
    C:  [0, 3, 2, 0, 1, 0],
    G:  [3, 2, 0, 0, 0, 3],
    D:  [0, 0, 0, 2, 3, 2],
    A:  [0, 0, 2, 2, 2, 0],
    E:  [0, 2, 2, 1, 0, 0],
    Am: [0, 0, 2, 2, 1, 0],
    Em: [0, 2, 2, 0, 0, 0],
    Dm: [0, 0, 0, 2, 3, 1],
  };

  const key = root + (isMinor ? "m" : "");
  const openShape = openChords[key];

  // fallback E-shape (barre)
  const fallbackShape = isMinor
    ? [0, 2, 2, 0, 0, 0]   // Em shape
    : [0, 2, 2, 1, 0, 0];  // E shape

  const shape = openShape ?? fallbackShape;

  // semitone shift from E only for barre fallback
  const semisFromE = openShape ? 0 : (noteIndex(root) - noteIndex("E") + 12) % 12;

  // absolute frets
  const absFrets = shape.map(f => (f === 0 ? 0 : f + semisFromE));

  // If barre chord, show diagram starting at the barre fret
  const startFret = openShape || semisFromE === 0 ? 1 : semisFromE; // e.g., B -> 7

  // convert absolute -> relative frets for drawing window (1..4)
  const relFrets = absFrets.map(f => (f === 0 ? 0 : f - startFret + 1));
  const barre = !openShape && semisFromE > 0;

  // drawing constants
  const W = 90, H = 120;
  const left = 12, top = 20;
  const xStep = 13;
  const yStep = 16;

  const stroke = dark ? "#aaa" : "#555";
  const dot = dark ? "#9BE7FF" : "#0B5FFF";
  const text = dark ? "#fff" : "#111";

  return (
    <svg width={W} height={H}>
      <text x="45" y="12" textAnchor="middle" fontSize="12" fontWeight="800" fill={text}>
        {chord}
      </text>

      {/* start fret label for barre chords */}
      {startFret > 1 && (
        <text x="6" y="32" fontSize="10" fontWeight="800" fill={text}>
          {startFret}fr
        </text>
      )}

      {/* strings */}
      {[0,1,2,3,4,5].map(i => (
        <line key={"s"+i} x1={left + i*xStep} y1={top} x2={left + i*xStep} y2={top + 4*yStep} stroke={stroke} />
      ))}

      {/* frets (0..4 lines = 4 fret spaces) */}
      {[0,1,2,3,4].map(i => (
        <line
          key={"f"+i}
          x1={left}
          y1={top + i*yStep}
          x2={left + 5*xStep}
          y2={top + i*yStep}
          stroke={stroke}
          strokeWidth={i === 0 && startFret === 1 ? 3 : 1}
        />
      ))}

      {/* barre line shown at fret 1 position within the window */}
      {barre && (
        <rect
          x={left}
          y={top + ((1 - 1) * yStep) + yStep / 2 - 3}
          width={5*xStep}
          height={6}
          rx={3}
          fill={dot}
        />
      )}

      {/* dots */}
      {relFrets.map((f, i) =>
        f > 0 && f <= 4 ? (
          <circle
            key={"d"+i}
            cx={left + i*xStep}
            cy={top + ((f - 1) * yStep) + yStep/2}
            r={5}
            fill={dot}
          />
        ) : null
      )}
    </svg>
  );
}

function ChordStrip({ chords, dark }: { chords: string[]; dark: boolean }) {
  if (!chords.length) return null;
  return (
    <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
      {chords.map((c) => (
        <ChordDiagram key={c} chord={c} dark={dark} />
      ))}
    </div>
  );
}
// ---------- Key selector logic (auto flats/sharps) ----------
const KEY_OPTIONS = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const FLAT_KEYS = new Set([
  "F",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
  "Dm",
  "Gm",
  "Cm",
  "Fm",
  "Bbm",
  "Ebm",
  "Abm",
]);

function splitKeyLabel(k: string): { root: string; minor: boolean } {
  const m = k.trim().match(/^([A-G])([#b]?)(m)?$/i);
  if (!m) return { root: k.trim(), minor: false };
  return { root: m[1].toUpperCase() + (m[2] || ""), minor: !!m[3] };
}

function noteIndex(root: string) {
  const s = normNoteToSharp(root);
  return NOTES_SHARP.indexOf(s);
}

function keyPrefersFlats(keyLabel: string) {
  const k = keyLabel.trim();
  if (k.includes("b")) return true;
  if (k.includes("#")) return false;
  if (FLAT_KEYS.has(k)) return true;
  return false; // default to sharps for naturals like E, A, D, G, B
}

function nearestSemitoneDelta(fromRoot: string, toRoot: string) {
  const a = noteIndex(fromRoot);
  const b = noteIndex(toRoot);
  if (a < 0 || b < 0) return 0;
  let d = (b - a + 12) % 12; // 0..11
  if (d > 6) d -= 12; // -5..+6 (nearest direction)
  return d;
}

function btnStyle(dark: boolean): React.CSSProperties {
  return {
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: 8,
    border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
    background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
    color: dark ? "#fff" : "#111",
    fontSize: 13,
  };
}

function pillStyle(active: boolean, dark: boolean): React.CSSProperties {
  return {
    padding: "8px 12px",
    margin: "0 6px 10px",
    cursor: "pointer",
    borderRadius: 999,
    border: active
      ? dark
        ? "1px solid #9BE7FF"
        : "1px solid #0B5FFF"
      : dark
      ? "1px solid rgba(255,255,255,0.25)"
      : "1px solid rgba(0,0,0,0.15)",
    background: active
      ? dark
        ? "rgba(155,231,255,0.15)"
        : "rgba(11,95,255,0.10)"
      : dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.95)",
    color: dark ? "#fff" : "#111",
    fontSize: 14,
    fontWeight: active ? 800 : 500,
  };
}

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("lyrics");

  const [stageMode, setStageMode] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [keepAwake, setKeepAwake] = useState(false);
  const [autoBoldChorus, setAutoBoldChorus] = useState(true);

  const [showVideo, setShowVideo] = useState(false);

  const [transposeSemis, setTransposeSemis] = useState(0);
  const [preferFlats, setPreferFlats] = useState(false);

  const [targetKey, setTargetKey] = useState<string>("C");
  const [showKeyPicker, setShowKeyPicker] = useState(false);

  // Force a re-render on rotation so the hint can appear/disappear
  const [, setViewportTick] = useState(0);

  const wakeLockRef = useRef<any>(null);
  const dark = stageMode;

  useEffect(() => {
    const onResize = () => setViewportTick((v) => v + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const containerStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      position: "relative",
      minHeight: "100vh",
      overflowY: "scroll",
      padding: stageMode ? 28 : 20,
      paddingBottom: showVideo ? 260 : 20,
      fontFamily: "Arial, sans-serif",
      background: stageMode ? "#000" : "#eaf4ff",
      color: stageMode ? "#fff" : "#000",
    };

    
if (showFlag && !stageMode) {
  base.backgroundImage = `
    linear-gradient(
      90deg,
      rgba(0, 51, 160, 0.18) 0%,
      rgba(0, 51, 160, 0.18) 33.33%,
      rgba(255, 209, 0, 0.18) 33.33%,
      rgba(255, 209, 0, 0.18) 66.66%,
      rgba(206, 17, 38, 0.18) 66.66%,
      rgba(206, 17, 38, 0.18) 100%
    )
  `;
  base.backgroundRepeat = "no-repeat";
}

    return base;
  }, [stageMode, showFlag, showVideo]);

  useEffect(() => {
    let cancelled = false;

    async function enableWakeLock() {
      try {
        if (!("wakeLock" in navigator)) return;
        // @ts-ignore
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          return;
        }
        wakeLockRef.current = sentinel;
      } catch {}
    }

    async function disableWakeLock() {
      try {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        }
      } catch {}
    }

    if (keepAwake) enableWakeLock();
    else disableWakeLock();

    return () => {
      cancelled = true;
      disableWakeLock();
    };
  }, [keepAwake]);

  // When a song is selected, reset transposition and set default key + accidentals
  useEffect(() => {
    if (!selectedSong) return;
    setTransposeSemis(0);
    setTargetKey(selectedSong.key);
    setPreferFlats(keyPrefersFlats(selectedSong.key));
    setShowKeyPicker(false);
  }, [selectedSong?.id]);

  // Lyrics + Chords view content (transposed)
const bothText = useMemo(() => {
  if (!selectedSong) return "";
  const raw = selectedSong.chords
    .split("\n")
    .some((l) => /[a-zA-ZăâîșțĂÂÎȘȚ]/.test(l))
    ? selectedSong.chords
    : `${selectedSong.chords}\n\n${selectedSong.lyrics}`;
  return transposeText(raw, transposeSemis, preferFlats);
}, [selectedSong, transposeSemis, preferFlats]);

// --- chords-only text (transposed) for diagrams ---
const transposedChordsText = useMemo(() => {
  if (!selectedSong) return "";
  return transposeText(selectedSong.chords || "", transposeSemis, preferFlats);
}, [selectedSong, transposeSemis, preferFlats]);

// --- extract used chords ---
const usedChords = useMemo(() => {
  return extractChordTokens(transposedChordsText);
}, [transposedChordsText]);

// ✅ displayKey MUST be defined before orderedChordsForStrip uses it
const displayKey = useMemo(() => {
  if (!selectedSong) return "";
  return transposeKeyLabel(selectedSong.key, transposeSemis, preferFlats);
}, [selectedSong, transposeSemis, preferFlats]);

// --- order chords as 1,4,5,6,2,3 ---
const orderedChordsForStrip = useMemo(() => {
  if (!selectedSong) return [];
  return chordsByDegreeOrder(usedChords, displayKey, preferFlats);
}, [selectedSong?.id, usedChords, displayKey, preferFlats]);


  useEffect(() => {
    setShowVideo(false);
  }, [selectedSong?.id]);

  const embedUrl = useMemo(() => {
    if (!selectedSong?.youtube) return "";
    if (!isYouTubeUrl(selectedSong.youtube)) return "";
    return toYouTubeEmbedUrl(selectedSong.youtube);
  }, [selectedSong?.youtube]);

  const metaStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: stageMode ? 18 : 14,
    color: dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
    marginTop: 6,
    position: "relative",
  };

  const keyButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginLeft: 8,
    padding: "4px 10px",
    borderRadius: 999,
    border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
    background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
    color: dark ? "#fff" : "#111",
    fontWeight: 800,
    cursor: stageMode ? "default" : "pointer",
    userSelect: "none",
  };

  const keyPickerStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: stageMode ? 34 : 30,
    zIndex: 1000,
    width: "min(520px, 92vw)",
    padding: 12,
    borderRadius: 14,
    border: dark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.12)",
    background: dark ? "#111" : "#fff",
    boxShadow: "0 12px 30px rgba(0,0,0,0.20)",
  };

  function applyTargetKey(newKey: string) {
    if (!selectedSong) return;

    const from = splitKeyLabel(selectedSong.key);
    const to = splitKeyLabel(newKey);

    const d = nearestSemitoneDelta(from.root, to.root);
    setTransposeSemis(d);
    setPreferFlats(keyPrefersFlats(newKey));
    setTargetKey(newKey);
    setShowKeyPicker(false);
  }

  return (
    <div style={containerStyle}>
      
{!stageMode && (
  <img
    src={kingdomKidsLogo}
    alt="Kingdom’s Kids"
    style={{
      position: "absolute",
      top: 8,
      left: 3,
      width: 80,
      opacity: 0.80,
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
)}

      <style>{`
        .moldovaTitle {
          font-weight: 900;
          letter-spacing: 0.5px;
          text-align: center;
          margin-bottom: 16px;
          font-size: 38px;
          background: linear-gradient(
            90deg,
            #0033A0 0%,
            #0033A0 33%,
            #FFD100 33%,
            #FFD100 66%,
            #CE1126 66%,
            #CE1126 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: moldovaWave 3.5s ease-in-out infinite;
          text-shadow: 0 1px 10px rgba(0,0,0,0.12);
        }
        @keyframes moldovaWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 480px) {
          .moldovaTitle { font-size: 30px; }
        }
      `}</style>

      {!selectedSong ? (
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 className="moldovaTitle">Moldova 2026</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center" }}>
            {songsData.map((song) => (
              <div
                key={`${song.id}-${song.title}`}
                onClick={() => {
                  setSelectedSong(song);
                  setViewMode("lyrics");
                  setStageMode(false);
                  setShowFlag(false);
                  setTransposeSemis(0);
                  setPreferFlats(keyPrefersFlats(song.key));
                  setTargetKey(song.key);
                  setShowVideo(false);
                }}
                style={{
                  cursor: "pointer",
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "rgba(255,255,255,0.98)",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 18 }}>{song.title}</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                   Key: {song.key}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => {
                setSelectedSong(null);
                setStageMode(false);
                setShowFlag(false);
                setTransposeSemis(0);
                setPreferFlats(false);
                setShowVideo(false);
                setShowKeyPicker(false);
              }}
             style={{
  background: "none",
  border: "none",
  color: dark ? "#9BE7FF" : "#0033A0",
  cursor: "pointer",

  // ✅ VISIBILITY
  fontSize: 22,       // bigger
  fontWeight: 900,    // bolder
  letterSpacing: 0.3,

  // ✅ POSITION (push below logo)
  marginTop: 72,      // key line 👈 adjust if needed

  // ✅ TOUCH FRIENDLY
  padding: "6px 0",

  alignSelf: "flex-start", // keeps it top-left in the row
}}
            >
              ← Back
            </button>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button onClick={() => setStageMode((v) => !v)} style={btnStyle(dark)}>
                {stageMode ? "Exit Stage" : "Stage Mode"}
              </button>

              <button onClick={() => setShowFlag((v) => !v)} style={btnStyle(dark)} disabled={stageMode}>
                {showFlag ? "Hide Flag" : "Show Flag"}
              </button>

              <button onClick={() => setKeepAwake((v) => !v)} style={btnStyle(dark)}>
                {keepAwake ? "Screen Awake ✓" : "Keep Screen On"}
              </button>

              <button onClick={() => setAutoBoldChorus((v) => !v)} style={btnStyle(dark)}>
                {autoBoldChorus ? "Chorus Bold ✓" : "Chorus Bold"}
              </button>
            </div>
          </div>

          <h2 style={{ textAlign: "center", fontWeight: 900, fontSize: stageMode ? 38 : 22, marginTop: 14 }}>
            {selectedSong.title}
          </h2>

          {embedUrl && !stageMode && (
            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 6 }}>
              <button
                onClick={() => setShowVideo((v) => !v)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #b00000",
                  background: "#ff4d4d",
                  color: "#000",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "transform 0.1s ease",
                }}
              >
                {showVideo ? "Hide Video" : "▶ Play Video"}
              </button>

              {showVideo && <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>Video playing (floating window)</div>}
            </div>
          )}

          {selectedSong.youtube && !embedUrl && !stageMode && (
            <div style={{ textAlign: "center", marginTop: 6 }}>
              <a href={selectedSong.youtube} target="_blank" rel="noopener noreferrer">
                ▶ Open Audio/Link
              </a>
            </div>
          )}

          <div style={metaStyle}>
            Key: <b>{displayKey}</b>
            {!stageMode && (
              <span
                style={keyButtonStyle}
                onClick={() => setShowKeyPicker((v) => !v)}
                title="Select a new key (auto sharps/flats)"
              >
                {targetKey} <span style={{ opacity: 0.85 }}>▼</span>
              </span>
            )}

            {showKeyPicker && !stageMode && (
              <div style={keyPickerStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ fontWeight: 900, marginBottom: 10, opacity: dark ? 0.95 : 0.9 }}>
                  Select Key
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                    gap: 8,
                  }}
                >
                  {KEY_OPTIONS.map((k) => {
                    const active = k === targetKey;
                    return (
                      <button
                        key={k}
                        onClick={() => applyTargetKey(k)}
                        style={{
                          padding: "10px 0",
                          borderRadius: 12,
                          border: active
                            ? dark
                              ? "1px solid #9BE7FF"
                              : "1px solid #0B5FFF"
                            : dark
                            ? "1px solid rgba(255,255,255,0.22)"
                            : "1px solid rgba(0,0,0,0.12)",
                          background: active
                            ? dark
                              ? "rgba(155,231,255,0.18)"
                              : "rgba(11,95,255,0.10)"
                            : dark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(255,255,255,0.98)",
                          color: dark ? "#fff" : "#111",
                          fontWeight: 900,
                          cursor: "pointer",
                        }}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>


                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <button onClick={() => setShowKeyPicker(false)} style={btnStyle(dark)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {!stageMode && (
            <>
              <div style={{ textAlign: "center", marginTop: 12, marginBottom: 6 }}>
                <button onClick={() => setViewMode("lyrics")} style={pillStyle(viewMode === "lyrics", dark)}>
                  Lyrics Only
                </button>
                <button onClick={() => setViewMode("both")} style={pillStyle(viewMode === "both", dark)}>
                  Lyrics + Chords
                </button>
              </div>
              {/* NOTE: Transpose buttons removed by request */}
            </>
          )}

          {viewMode === "both" && isPhonePortrait() && !stageMode && (
            <div style={{ textAlign: "center", fontSize: 12, opacity: 0.65, marginBottom: 8 }}>
              Tip: rotate phone to landscape for better chord alignment
            </div>
          )}

{viewMode === "both" && (
  <ChordStrip chords={orderedChordsForStrip} dark={dark} />
)}

          {viewMode === "lyrics"
            ? renderWithSectionStyling(selectedSong.lyrics, {
                stageMode,
                dark,
                autoBoldChorus,
                mono: false,
              })
            : renderWithSectionStyling(bothText, {
                stageMode,
                dark,
                autoBoldChorus,
                mono: true,
              })}
        </div>
      )}

      {/* Floating YouTube mini-player overlay */}
      {showVideo && embedUrl && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 340,
            maxWidth: "92vw",
            paddingTop: "56.25%",
            background: "#000",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              padding: "2px 8px",
              fontSize: 12,
            }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
