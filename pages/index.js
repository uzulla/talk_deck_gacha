import { useState } from "react";
import styles from "../styles/Home.module.css";
import path from 'path';
import fs from 'fs';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data/options.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const options = fileContent.split('\n').map(line => line.trim()).filter(line => line);

  return {
    props: {
      options,
    },
  };
}

export default function Home({ options }) {
  const [result, setResult] = useState("");

  const drawLot = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setResult(options[randomIndex]);
  };

  return (
    <div className={styles.container}>
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        {result && <p className={styles.result}>{result}</p>}
      </div>
      <div style={{ marginTop: "auto" }}>
        <button className={styles.button} onClick={drawLot}>
          会話デッキガチャを引く
        </button>
      </div>
    </div>
  );
}
