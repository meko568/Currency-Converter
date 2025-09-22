'use client';
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  function handle(e: React.ChangeEvent<HTMLSelectElement>){
    return e.target.value;
  }
  const [number, setNumber] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState(0);

  // All currencies supported by Frankfurter API
  const currencies = [
    { code: "AED", name: "UAE Dirham" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli Shekel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "ISK", name: "Icelandic Krona" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "Taiwan Dollar" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "USD", name: "US Dollar" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "ZAR", name: "South African Rand" }
  ];

  function convert(from: string, to: string) {
    fetch(`https://v6.exchangerate-api.com/v6/aa274d981093ddd1deea9784/latest/${from}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.conversion_rates[to];
        setResult(number * rate);
      });
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Currency Converter</h1>
        <form className={styles.form}>
          <input
            onChange={(e) => setNumber(parseFloat(e.target.value))}
            type="number"
            className={styles.input}
            placeholder="Amount"
            min="0"
          />
          <select value={from} onChange={(e) => setFrom(handle(e))} className={styles.select}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>→</span>
          <select value={to} onChange={(e) => setTo(handle(e))} className={styles.select}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </form>
        <button onClick={() => convert(from, to)} className={styles.button}>
          Convert
        </button>
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>   
  );
}
