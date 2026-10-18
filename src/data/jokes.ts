import type { CategoryId } from './categories';

export type Joke = {
  id: string;
  category: CategoryId;
  text: string;
};

// Primer lote de chistes, redactados con texto propio. Los diálogos usan
// salto de línea entre intervenciones.
const RAW: Record<CategoryId, string[]> = {
  cortos: [
    '—¿Qué le dice un techo a otro?\n—Techo de menos.',
    '—¿Cuál es el café más peligroso del mundo?\n—El ex-preso.',
    '—Mamá, ¿qué haces delante del ordenador con los ojos cerrados?\n—Nada, hijo, que me ha dicho que cierre las pestañas.',
    '—¿Por qué las focas del circo miran siempre hacia arriba?\n—Porque es donde están los focos.',
    '—Doctor, tengo complejo de feo.\n—Hombre, de complejo nada.',
    '—¿Cómo se dice pañuelo en japonés?\n—Saka-moko.',
    '—¿Qué le dice el 0 al 8?\n—Bonito cinturón.',
    'Me compré un diccionario de sinónimos y todas las páginas estaban en blanco. No tengo palabras.',
    '—¿Por qué está triste el libro de matemáticas?\n—Porque tiene demasiados problemas.',
    '—¿Cuál es tu plato favorito?\n—El hondo, que cabe más.',
    '—¿Cuál es el colmo de un electricista?\n—Que su mujer se llame Luz y sus hijos le sigan la corriente.',
    'Dicen que el dinero no da la felicidad. Ya, pero prefiero llorar en un descapotable.',
    '—¿Qué hace una abeja en el gimnasio?\n—¡Zum-ba!',
  ],
  largos: [
    'Un hombre entra en una tienda de loros.\n—¿Cuánto cuesta este?\n—Mil euros. Habla tres idiomas.\n—¿Y ese?\n—Dos mil. Programa en Python y lleva la contabilidad.\n—¿Y aquel que está dormido en la esquina?\n—Cinco mil.\n—¿Y qué sabe hacer?\n—Ni idea, pero los otros dos le llaman "jefe".',
    'Un hombre frota una lámpara y sale un genio.\n—Te concedo un deseo.\n—Quiero un puente desde Cádiz hasta Canarias para ir en coche.\n—Uf, eso es muchísimo cemento, pilares en mitad del océano... pide otra cosa.\n—Vale. Quiero entender la factura de la luz.\n—... ¿El puente lo quieres de dos carriles o de cuatro?',
    'Un hombre perdido en el desierto, muerto de sed, se encuentra a un vendedor ambulante.\n—¡Agua, por favor!\n—No tengo agua. Solo vendo corbatas.\nSigue caminando dos días más y por fin ve un restaurante de lujo. Se arrastra hasta la puerta y el portero le para:\n—Lo siento, caballero. Sin corbata no se puede entrar.',
    'Un abuelo le cuenta a su amigo:\n—Me he comprado un audífono carísimo, último modelo. Oigo hasta los pájaros del parque.\n—¡Qué maravilla! ¿Y qué tipo es?\n—Las cuatro y media.',
    'Tres amigos mueren en un accidente y en la puerta del cielo San Pedro les pregunta:\n—En vuestro funeral, ¿qué os gustaría oír?\nEl primero:\n—Que fui un gran médico y un buen padre.\nEl segundo:\n—Que fui un profesor que cambió la vida de sus alumnos.\nEl tercero:\n—Yo quiero oír: "¡Mirad, se está moviendo!"',
    'Llegan al cielo un cura y un conductor de autobús. Al conductor le dan una mansión con piscina; al cura, un estudio sin ventanas.\n—¡Esto es una injusticia! ¡Yo dediqué mi vida a Dios!\n—Mira —le dice San Pedro—, aquí contamos resultados. Cuando tú predicabas, la gente se dormía. Cuando él conducía, rezaba todo el autobús.',
    'Un hombre le pregunta a Dios:\n—Señor, ¿qué es para ti un millón de años?\n—Un segundo.\n—¿Y un millón de euros?\n—Un céntimo.\n—Señor... ¿me das un céntimo?\n—Espera un segundo.',
    'Sherlock Holmes y Watson se van de acampada. A medianoche, Holmes le despierta:\n—Watson, mire al cielo y dígame qué deduce.\n—Veo millones de estrellas. Deduzco que hay miles de galaxias, que quizá haya vida en otros planetas y que mañana hará buen tiempo. ¿Y usted, Holmes?\n—Yo deduzco que nos han robado la tienda de campaña.',
    'Un hombre va al médico:\n—Doctor, me duele todo. Me toco aquí y me duele, me toco aquí y me duele, me toco la rodilla y me duele...\nEl médico le examina un rato y dice:\n—Tiene usted el dedo roto.',
  ],
  'humor-negro': [
    'Mi abuelo murió tranquilo, durmiendo. No como los pasajeros de su autobús, que iban gritando.',
    '—Mamá, en el colegio me llaman despistado.\n—Niño, tú vives en la casa de enfrente.',
    '—Doctor, ¿cuánto me queda?\n—Diez.\n—¿Diez qué? ¿Años? ¿Meses?\n—Nueve, ocho, siete...',
    'Lo mejor de tener mala memoria es que puedes esconder tú mismo los huevos de Pascua.',
    'Mi abuelo dejó escrito en su testamento: "Y a mi sobrino Pedro, que siempre quiso salir en mi testamento: ¡Hola, Pedro!".',
    'Mi padre siempre decía: "Lo importante no es ganar, es participar". Por eso perdió la casa jugando al póker.',
    '—Doctor, ¿cómo ha salido la operación?\n—¿Qué operación? Yo soy San Pedro.',
    'Dicen que hay que vivir cada día como si fuera el último. Así que hoy he llamado a mi madre, he perdonado a mi ex y he dejado de pagar la hipoteca.',
    'Mi psicólogo me dijo que escribiera cartas a la gente que odio y luego las quemara. Ya lo he hecho, pero ahora no sé qué hacer con las cartas.',
    '—Tengo una noticia buena y una mala. La mala es que le quedan dos semanas de vida.\n—¿Y la buena?\n—¿Ve a esa enfermera tan guapa? Pues me caso con ella el sábado.',
    '—Papá, ¿qué se siente al tener un hijo tan guapo?\n—No sé, hijo. Pregúntale a tu abuelo.',
    'En mi familia todos morimos de viejos. Bueno, menos el tío Paco, que decía "sujétame el cubata".',
  ],
  verdes: [
    '—Cariño, ¿te ha gustado?\n—Ha sido como un cohete: mucha cuenta atrás y a los tres segundos ya estabas en el espacio.',
    'Mi novia me pidió para su cumpleaños algo largo y duro. La he apuntado a unas oposiciones.',
    '—¿Qué le dice el pene al preservativo?\n—Cúbreme, que voy a entrar.',
    '—Cariño, ¿por qué nunca me avisas cuando llegas al orgasmo?\n—Porque nunca estás.',
    'La primera vez que mi novia y yo hicimos el amor fue mágico: a los cinco minutos ella había desaparecido.',
    'Un señor de noventa años se casa con una chica de veinticinco. El médico le advierte:\n—Cuidado, que la noche de bodas puede ser mortal.\n—Bueno, si se muere, se muere.',
    'Le dije a mi pareja que en la cama soy como un ninja: rápido, silencioso... y ella no se entera de nada.',
    'Mi vida sexual es como el Mundial: cada cuatro años, y casi siempre la veo por la tele.',
    'Tengo el Kamasutra en el móvil, pero solo practico la postura "sofá y Netflix".',
    'Le pregunté al farmacéutico si la Viagra tenía efectos secundarios.\n—Sí —me dijo—, que a los ochenta años vuelves a pagar cenas.',
    '—Doctor, ¿el sexo es bueno para el corazón?\n—Depende. ¿Con su mujer o con la vecina?\n—¿Y qué diferencia hay?\n—Que con la vecina el corazón se acelera bastante más.',
  ],
  jaimito: [
    '—Jaimito, dime una palabra que tenga muchas "o".\n—¡Gooooooool!',
    '—Jaimito, si tengo cinco caramelos en una mano y seis en la otra, ¿qué tengo?\n—Unas manos enormes, señorita.',
    '—Jaimito, ¿por qué llegas tarde?\n—Por la señal, señorita.\n—¿Qué señal?\n—La que dice "Escuela: vaya despacio".',
    '—Jaimito, conjuga el verbo nadar.\n—Yo nado, tú nadas, él nada...\n—¡Más rápido!\n—Yo nado, tú nadas, él nada, nosotros buceamos...',
    '—Jaimito, ¿por qué tu redacción sobre tu perro es igual que la de tu hermano?\n—Porque es el mismo perro, señorita.',
    '—Jaimito, dime cinco animales de África.\n—Tres leones y dos elefantes.',
    '—Jaimito, ¿qué quieres ser de mayor?\n—Lo mismo que mi padre: millonario.\n—¿Tu padre es millonario?\n—No, él también quiere serlo.',
    '—Jaimito, tu examen es idéntico al de tu compañero salvo en la última pregunta. Él puso "No lo sé" y tú pusiste "Yo tampoco".',
    '—Papá, ¿me compras un tambor?\n—No, que luego no me dejas en paz.\n—Te prometo que solo lo toco cuando estés dormido.',
    '—Jaimito, ¿qué es más importante, el Sol o la Luna?\n—La Luna, señorita.\n—¿Por qué?\n—Porque sale de noche, cuando hace falta. El Sol sale de día, cuando ya hay luz.',
  ],
  parejas: [
    'Mi mujer y yo fuimos felices durante veinte años. Luego nos conocimos.',
    '—Cariño, tengo una noticia buena y una mala.\n—Primero la buena.\n—El airbag funciona.',
    'Mi novia me dejó porque decía que no le prestaba atención. O algo así, no estaba escuchando.',
    '—¿Me quieres?\n—Claro.\n—¿Mucho?\n—Lo justo para no pagar el alquiler yo solo.',
    'El matrimonio es como un restaurante: cuando ves lo que ha pedido la mesa de al lado, ya es tarde.',
    'Mi pareja dice que soy indeciso. Bueno, no sé. Puede ser. O no.',
    'Mi novia me ha dicho que si no dejo el fútbol, me deja. La voy a echar de menos.',
    '—Cariño, he cambiado de opinión.\n—Menos mal. ¿Y la nueva funciona mejor?',
    'Mi suegra y yo tenemos algo en común: las dos personas a las que más quiere son su hija y ella misma. Yo no salgo en la lista.',
    '—Amor, ¿qué te gusta más de mí, mi cuerpo o mi inteligencia?\n—Tu sentido del humor.',
  ],
  trabajo: [
    '—¿A qué se dedica usted?\n—Soy optimista.\n—¿Y eso da dinero?\n—Todavía no, pero dará.',
    'Mi jefe me dijo: "Vístete para el trabajo que quieres, no para el que tienes". Al día siguiente fui en pijama.',
    '—¿Por qué deberíamos contratarle?\n—Porque soy muy perseverante.\n—Lo siento, el puesto ya está cubierto.\n—¿Por qué deberíamos contratarle?',
    'En la entrevista:\n—¿Cuál es su mayor defecto?\n—La sinceridad.\n—Yo no creo que eso sea un defecto.\n—Me da igual lo que usted crea.',
    '—Jefe, necesito un aumento. Tengo a tres empresas detrás de mí.\n—¿Cuáles?\n—La de la luz, la del agua y la del gas.',
    'Mi empresa dice que somos una familia. Por eso nadie cobra lo que merece y todos nos odiamos en Navidad.',
    'Teletrabajar es estar en pijama de cintura para abajo y en pánico de cintura para arriba.',
    '—¿Cuántos programadores hacen falta para cambiar una bombilla?\n—Ninguno. Es un problema de hardware.',
    '—¿Usted cree en la vida después de la muerte?\n—Sí, jefe.\n—Me alegro, porque ayer, cuando se fue antes al entierro de su abuela, ella vino a buscarle.',
    'Esta reunión podría haber sido un correo. Y el correo podría no haberse enviado.',
  ],
  absurdos: [
    '—¿Qué hace un pez?\n—Nada.',
    'Había una vez un perro llamado Pegamento. Se cayó y se pegó.',
    '—¿Qué le dice una iguana a su hermana gemela?\n—Somos iguanitas.',
    '—Hola, ¿está Agustín?\n—No, estoy incómodo.',
    '—¿Cómo se llama el campeón japonés de buceo?\n—Tokofondo.\n—¿Y el subcampeón?\n—Kasitoko.',
    '—¿Qué le dice una pared a otra?\n—Nos vemos en la esquina.',
    '—Hola, soy Rosa.\n—Ah, perdona, es que soy daltónico.',
    'Van dos y se cae el del medio.',
    '—¿Cuál es el colmo de Aladdín?\n—Tener mal genio.',
    '—¿Qué hace un mudo bailando?\n—Una mudanza.',
    '—Camarero, hay una mosca en mi sopa.\n—Tranquilo, la araña del pan se encarga.',
  ],
  'de-padre': [
    '—¿Cómo se despiden los químicos?\n—Ácido un placer.',
    '—¿Qué le dice un gusano a otro?\n—Me voy a dar una vuelta a la manzana.',
    '—¿Cuál es el animal más antiguo?\n—La cebra, porque está en blanco y negro.',
    '—¿Qué hace una vaca pensando?\n—Leche concentrada.',
    '—¿Cuál fue el último animal en subir al arca de Noé?\n—El delfín.',
    '—¿Qué le dice un semáforo a otro?\n—No me mires, que me estoy cambiando.',
    '—¿Cómo se dice disparo en árabe?\n—Ahí-va-la-bala.',
    '—¿Qué le dice una impresora a otra?\n—¿Esa hoja es tuya o es impresión mía?',
    '—¿Cuál es el pez que huele mal?\n—El peztoso.',
    '—¿Por qué los pájaros no usan Facebook?\n—Porque ya tienen Twitter.',
  ],
};

export const JOKES: Joke[] = (Object.keys(RAW) as CategoryId[]).flatMap((category) =>
  RAW[category].map((text, i) => ({ id: `${category}-${i + 1}`, category, text })),
);

export function jokesFor(category: CategoryId): Joke[] {
  return JOKES.filter((j) => j.category === category);
}

export function getJoke(id: string): Joke | undefined {
  return JOKES.find((j) => j.id === id);
}
