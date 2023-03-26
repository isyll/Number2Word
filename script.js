function number2Words(number) {
  const spelled = {
      zero: "zéro",
      units: [
        "un",
        "deux",
        "trois",
        "quatre",
        "cinq",
        "six",
        "sept",
        "huit",
        "neuf",
      ],
      tenTwenty: [
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
        "soixante",
        "quatre-vingt",
        "quatre-vingt",
      ],
      hundred: "cent",
      thousand: "mille",
      million: "million",
      billion: "milliard",
    },
    max = 1000000000000;

  if (typeof number !== "number") return;
  number = Math.abs(parseInt(number));

  if (number >= max) return;

  function lessThanThousand(num) {
    if (!num) return spelled.zero;
    if (num < 10) return spelled.units[num - 1];
    if (num < 20) return spelled.tenTwenty[num - 10];

    if (num < 100) {
      let units = num % 10,
        ret = spelled.tens[Math.floor(num / 10) - 1];
      if (num - units === 70 || num - units === 90)
        ret += "-" + spelled.tenTwenty[units];
      else ret += units ? "-" + spelled.units[units - 1] : "";
      return ret;
    }
    if (num < 1000) {
      let tens = num % 100;
      let ret = tens ? "-" + lessThanThousand(tens) : "";
      tens = Math.floor(num / 100);

      return `${tens > 1 ? spelled.units[tens - 1] + "-" : ""}${
        spelled.hundred
      }${ret}`;
    }
  }

  let w = lessThanThousand(number);
  if (w) return w;

  let i = 0,
    ret = number % 1000 ? lessThanThousand(number % 1000) : "",
    llions = [spelled.thousand, spelled.million, spelled.billion];

  while (!w && i < llions.length) {
    ret = ret.length ? "-" + ret : "";
    number = Math.floor(number / 1000);
    ret =
      `${number % 1000 !== 0 ? lessThanThousand(number % 1000) + "-" : ""}${
        number % 1000 !== 0 ? llions[i] : ""
      }` + ret;
    w = lessThanThousand(number);
    i++;
  }
  if (i === 1 && ret.split("-")[0] === spelled.units[0])
    ret = ret.slice(ret.split("-")[0].length + 1);

  return ret.replace(/-{2,}/, "-");
}

document.getElementById("nbr").addEventListener("input", function (e) {
  let a = +e.target.value,
    elem = document.getElementById("test");
  if (!isNaN(a)) elem.innerHTML = a + " -> " + number2Words(a);
  else elem.innerHTML = "Entrez un nombre valide!";
});
