export interface GrammarTip {
  title: string;
  rule: string;
  example: string;
  error: string;
}

export const GRAMMAR: Record<string, GrammarTip[]> = {
  'a1/bano': [
    {
      title: 'Presente -ER',
      rule: 'Raíz del infinitivo + terminaciones: -e, -es, -e, -ons, -ez, -ent',
      example: 'Je brosse → nous brossons → ils brossent',
      error: 'No confundas "je brosse" (yo cepillo) con "je brosse" (yo cepillo). El acento no cambia la pronunciación.',
    },
    {
      title: 'Pronombres personales sujeto',
      rule: 'je, tu, il/elle, nous, vous, ils/elles. "Vous" es tanto singular formal como plural.',
      example: 'Tu vas? (informal) vs Vous allez? (formal)',
      error: 'Nunca digas "je suis" como "zhí süi" → suena como "J\'suis" natural.',
    },
  ],
  'a1/cocina': [
    {
      title: 'Verbos -ER: allumer, préparer',
      rule: 'Mismo patrón: allum-e, allum-es, allum-e, allum-ons, allum-ez, allum-ent',
      example: 'J\'allume la cafetière → Nous allumons la cafetière',
      error: 'Cuidado: "allumer" no es "allumer" en español. Es "encender".',
    },
    {
      title: 'Le passé composé con avoir',
      rule: 'Sujeto + avoir (conjugado) + participio pasado (-é, -i, -u, -is)',
      example: 'J\'ai préparé le café (preparé el café)',
      error: 'No confundas "j\'ai fait" (hice) con "je fais" (hago).',
    },
  ],
  'a1/dormitorio': [
    {
      title: 'Verbos -IR',
      rule: 'Raíz + -is, -is, -it, -issons, -issez, -issent',
      example: 'Je finis → nous finissons → ils finissent',
      error: '"Ouvrir" es -IR pero irregular: j\'ouvre (no "j\'ouvrís").',
    },
    {
      title: 'Verbos reflexivos',
      rule: 'Sujeto + pronombre reflexivo (me, te, se, nous, vous, se) + verbo conjugado',
      example: 'Je me lève (me levanto) → Il se couche (se acuesta)',
      error: 'El pronombre reflexivo concuerda con el sujeto: je ME lève, tu TE lèves.',
    },
  ],
  'a1/espacio_publico': [
    {
      title: 'Verbos reflexivos con se promener',
      rule: 'Je me promène, tu te promènes, il se promène...',
      example: 'Je me promène dans le parc (paseo por el parque)',
      error: 'No olvides el guión en "se promener" cuando está en infinitivo.',
    },
    {
      title: 'Presente de verbos -ER irregulares',
      rule: 'Algunos verbos -ER tienen irregularidades: manger → mangeons (no "mangons")',
      example: 'Je marche (caminamos) → Nous marchons',
      error: 'Error común: "nous mangons" → correcto: "nous mangeons".',
    },
  ],
  'a1/sala_comedor': [
    {
      title: 'Presente: verbos de uso cotidiano',
      rule: 'regarder (mirar), manger (comer), discuter (charlar)',
      example: 'Je regarde la télé (miro la tele) vs Nous discutons (charlamos)',
      error: '"Discuter" en francés NO es discutir en el sentido de pelear. Es charlar.',
    },
  ],
  'a1/servicios': [
    {
      title: 'Verbos con cambios ortográficos',
      rule: 'appeler → j\'appelle (doble l), envoyer → j\'envoie (y→i)',
      example: 'J\'appelle le médecin (llamo al médico)',
      error: 'No digas "j\'appelle" con una "l". Siempre doble: appelle.',
    },
  ],
  'a1/trabajo': [
    {
      title: 'Presente: verbos de trabajo',
      rule: 'travailler, commencer, finir - patrones regulares',
      example: 'Je travaille (trabajo) → Ils travaillent (trabajan)',
      error: 'Cuidado: "finir" es -IR regular, no -ER. Je finis (no "je fine").',
    },
  ],
  'a2/bano': [
    {
      title: 'Passé Composé con être',
      rule: 'Sujeto + être (conjugado) + participio pasado (concuerda en género/número)',
      example: 'Je suis entré(e) → Nous sommes entré(e)s',
      error: 'El participio CONCUERDA: "je suis allé" (masc.) vs "je suis allée" (fem.).',
    },
    {
      title: 'Imparfait: descripción y hábito',
      rule: 'Raíz nous del presente + terminaciones: -ais, -ais, -ait, -ions, -iez, -aient',
      example: 'Je prenais (tomaba/habitual) vs J\'ai pris (tomé/puntual)',
      error: 'Error clásico: "quand j\'étais petit, je suis allé" → correcto: "quand j\'étais petit, j\'allais".',
    },
  ],
  'a2/cocina': [
    {
      title: 'Passé Composé con avoir',
      rule: 'Sujeto + avoir (conjugado) + participio pasado',
      example: 'J\'ai préparé le café (preparé el café)',
      error: '"J\'ai fait" (hice) es irregular. El participio de "faire" es "fait".',
    },
  ],
  'a2/dormitorio': [
    {
      title: 'Passé Composé con verbos reflexivos',
      rule: 'Sujeto + être + pronombre reflexivo + participio pasado (concuerda)',
      example: 'Je me suis réveillé(e) → Ils se sont réveillé(e)s',
      error: 'El participio concuerda con el SUJETO, no con "me/te/se": "je me suis lavé" (masc.).',
    },
  ],
  'a2/espacio_publico': [
    {
      title: 'Passé Composé vs Imparfait',
      rule: 'PC = acción puntual (entré, crucé). Imparfait = descripción/hábito (conocía, paseaba)',
      example: 'J\'ai traversé la rue (crucé) / Je connaissais la ville (conocía)',
      error: 'No uses passé composé para describir el fondo de la escena: "il faisait beau" (hacía buen tiempo).',
    },
  ],
  'a2/sala_comedor': [
    {
      title: 'Imparfait para rutinas pasadas',
      rule: 'Je regardais (miraba/habitual), je mangeais (comía/habitual)',
      example: 'Quand j\'étais petit, je regardais la télé tous les soirs',
      error: '"Quand il a plu, je regardais" → correcto: "quand il a plu, je regardais la télé".',
    },
  ],
  'a2/servicios': [
    {
      title: 'Passé Composé: llegada y movimiento',
      rule: 'Suis arrivé, sommes partis, sont entrés (con être)',
      example: 'Je suis allé sur la place (fui a la plaza)',
      error: '"Je suis allé" vs "J\'ai allumé" → Different verbs: aller (être) vs allumer (avoir).',
    },
  ],
  'a2/trabajo': [
    {
      title: 'Imparfait: descripciones en el pasado',
      rule: 'Je travaillais (trabajaba), il faisait (hacía), nous avions (teníamos)',
      example: 'À l\'époque, je travaillais dans un bureau (En esa época, trabajaba en una oficina)',
      error: 'No uses Imparfait para acciones puntuales: "j\'ai fini" (terminé), no "je finissais".',
    },
  ],
  'b1/bano': [
    {
      title: 'Futur Simple',
      rule: 'Infinitivo + terminaciones: -ai, -as, -a, -ons, -ez, -ont',
      example: 'Je prendrai (tomaré) → Ils prendront (tomarán)',
      error: 'No confundas Futur Simple con Futur Proche: "je prendrai" (formal) vs "je vais prendre" (oral).',
    },
    {
      title: 'Futur Proche: aller + infinitivo',
      rule: 'Sujeto + aller (presente) + infinitivo del verbo',
      example: 'Je vais me préparer (voy a prepararme)',
      error: 'No uses "je vais" + infinitivo para el Futur Simple. Son tiempos diferentes.',
    },
  ],
  'b1/cocina': [
    {
      title: 'Irregulares del Futur Simple',
      rule: 'faire → ferai, avoir → aurai, être → serai, aller → irai, pouvoir → pourrai',
      example: 'Je ferai la cuisine (haré la cocina)',
      error: '"Je ferai" (haré) no es "je ferai" (haré). El acento grave es obligatorio.',
    },
  ],
  'b1/dormitorio': [
    {
      title: 'Futur Simple con -ER irregulares',
      rule: 'acheter → achèterai (grave accent), lever → lèverai',
      example: 'J\'achèterai un nouveau lit (compraré una cama nueva)',
      error: 'No olvides el acento grave: "j\'achète" (presente) vs "j\'achèterai" (futuro).',
    },
  ],
  'b1/espacio_publico': [
    {
      title: 'Futuro para planes',
      rule: 'Je vais en ville demain (voy a la ciudad mañana)',
      example: 'J\'prendrai le bus et je visiterai le musée',
      error: '"Je vais" en presente puede significar Futur Proche. No confundas con el verbo ir literal.',
    },
  ],
  'b1/sala_comedor': [
    {
      title: 'Futuro: comedores y eventos',
      rule: 'Nous mangerons au restaurant (comeremos en el restaurante)',
      example: 'J\'inviterai mes amis (invitaré a mis amigos)',
      error: '"J\'inviterai" (invitaré) tiene un solo "r". No escribas "inviterai".',
    },
  ],
  'b1/servicios': [
    {
      title: 'Futuro: servicios y trámites',
      rule: 'J\'enverrai la lettre (enviaré la carta)',
      example: 'Je paierai en ligne (pagaré en línea)',
      error: 'No escribas "j\'envoyerai". El stem irregular es "enverr-".',
    },
  ],
  'b1/trabajo': [
    {
      title: 'Futuro: proyectos y plazos',
      rule: 'Je terminerai le projet (terminaré el proyecto)',
      example: 'J\'enverrai le rapport demain (enviaré el informe mañana)',
      error: '"Réussir" → "je réussirai" (dobles "s" en la pronunciación, no en escritura).',
    },
  ],
};
