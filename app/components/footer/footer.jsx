import { Link } from '~/components/link';
import { Text } from '~/components/text';
import { classes } from '~/utils/style';
import config from '~/config.json';
import styles from './footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} ${config.name}.`}
      </span>
        <span>Modified by yours truly. </span> 
      <Link secondary className={styles.link} href="https://github.com/moonshinerlax/Aiven-Portfolio" target="_self">
        Original Code by HammishMW
      </Link>
    </Text>
  </footer>
);
