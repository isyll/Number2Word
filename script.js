function number2Words(number) {
  const spelled = {
    units: [
      "un",
      "deux",
      "trois",
      "quatres",
      "cinq",
      "six",
      "sept",
      "huit",
      "neuf",
    ],
    "10-20": [
      "dix",
      "onze",
      "douze",
      "treize",
      "quatorze",
      "quinze",
      "seize",
      "dix-sept",
      "dix-huit",
      "dix-neuf",
    ],
    tens: [
      "dix",
      "vingt",
      "trente",
      "quarante",
      "cinquante",
      "soixante",
      "soixante-dix",
      "quatre-vingt",
      "quatre-vingt-dix",
    ],
    hundred: "cent",
    thousand: "mille",
    million: "million",
    billion: "milliard",
  };

  if (typeof number !== "number") return;
  number = parseInt(number);

  if (!number) return "zéro";
  if (number > 999999999999) return;

  let units = number % 10,
    tens = number % 100,
    hundreds = number % 1000,
    w,
    lessThanHundred = (number) => {
      if (units === number) return spelled.units[number - 1];
      if (number < 20) return spelled["10-20"][number - 10];
      if (number === tens) {
        w = spelled.tens[(number - units) / 10 - 1];
        if (!units) return w;

        return w + `-${spelled.units[units - 1]}`;
      }
    };

  w = lessThanHundred(number);
  if (w) return w;

  if (number === hundreds) {
    w = spelled.units[(number - tens) / 100 - 1];
    if (number - tens === 100) w = "";
    else w += "-";
    w += `${spelled.hundred}-${lessThanHundred(tens)}`;
    return w;
  }

  let endPart = lessThanHundred(hundreds);
}

document.getElementById("nbr").addEventListener("input", function (e) {
  let a = +e.target.value,
    elem = document.getElementById("test");
  if (a) elem.innerHTML = a + " -> " + number2Words(a);
  else elem.innerHTML = "Entrez un nombre valide!";
});
