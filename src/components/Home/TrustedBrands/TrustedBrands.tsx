import styles from "./TrustedBrands.module.scss";

export default function TrustedBrands() {
  const brands = ["VidoraHub","ZYLOSIS"];

  return (
    <section className={styles.wrapper}>
      <p className={styles.title}>TRUSTED BY WORLD-CLASS BRANDS</p>

      <div className={styles.brands}>
        {brands.map((brand) => (
          <span key={brand} className={styles.brand}>
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}