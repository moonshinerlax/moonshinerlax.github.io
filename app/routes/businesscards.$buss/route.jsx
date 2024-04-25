import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { baseMeta } from '~/utils/meta';
import { businesslist } from '../bussinesslist/churreriatradicional';
import styles from './business.module.css';
import { Button } from '~/components/button';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { ProjectBackground, ProjectContainer, ProjectHeader, ProjectSection } from '~/layouts/project';
import { useTheme } from '~/components/theme-provider';
import { ThemeToggle } from '~/layouts/navbar/theme-toggle';
import { Link } from '~/components/link';
import { Text } from '~/components/text';
import config from '~/config.json';
import { Image } from '~/components/image';

export async function loader({ request, context }) {
  const slug = request.url.split('/').at(-1);
  const relink = slug.split('?').at(0);
  const business = businesslist.find(business => business.id === relink);
  if (!business) {
    return json({
      error: 'Business not found'
    });
  }
  try {
    if (business.facebookApp) {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${business.facebookPageId}/feed?fields=message,actions,attachments&access_token=${context.cloudflare.env.ACCESS_TOKEN}`
      );
      const data = await response.json();
      // Filter the posts to get only the ones with media attachments
      const filteredPosts = data.data.filter(post =>
        post.attachments &&
        (post.attachments.data[0].type === 'photo' || post.attachments.data[0].type === 'video_autoplay' || post.attachments.data[0].type === 'video_inline')
      ).slice(0, 3);
      return json({
        business,
        filteredPosts
      });
    }
    return json({
      business
    });
    // Limit to the last 3 posts // Call useFacebookPost with the Facebook page ID
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return json({
      error: 'Error fetching Facebook posts'
    });
  }
}

export function meta({ data }) {
  const { name, description } = data.business;
  return baseMeta({ name, description: description, prefix: '' });
}

export default function Businesscards() {
  const { business, filteredPosts } = useLoaderData();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <>
    <ProjectContainer>
      <ProjectBackground
        opacity={ isDark ? 0.5 : 0.8 }
        src={business.image}
        srcSet={`${business.image} 1080w, ${business.image} 2160w`}
        placeholder={ business.image }
        />
      <ThemeToggle isMobile/>
      <ProjectHeader
          title={business.name}
          description={business.description}
        />
        <div className={styles.buttonContainer}>
    <Button className={styles.buttonwhats} href={business.whatsapp} secondary="red">WhastApp <FaWhatsapp/></Button>
    <Button className={styles.buttonface} href={business.facebook}>Facebook <FaFacebook/></Button>
    <Button className={styles.buttoninsta} href={business.instagram}>Instagram <FaInstagram/></Button>
        </div>
        {filteredPosts && <ProjectSection >
          <div className={ styles.postContainer }>
          { filteredPosts.map(post => (
            <div key={post.id} className={styles.mediaContainer} >
              <Link href={ post.actions[0].link }>
                <Image
              noPauseButton
              raised
              srcSet={`${post.attachments.data[0].media.source} 1280w, ${post.attachments.data[0].media.source} 2560w`}
              width={300}
              height={300}
              placeholder={post.attachments.data[0].media.source}
              alt={post.message}
              // sizes={`(max-width: ${media.mobile}px)`}
              >
          </Image>
                </Link>
              </div>
        ))}
        </div>
        </ProjectSection>}
      </ProjectContainer>
      <ProjectSection>
    <footer>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} ${config.name}. `}
      </span>
      <Link secondary className={styles.link} href="https://www.facebook.com/IvanCalifornia" target="_self">
       Made with ❣️
      </Link>
    </Text>
    </footer>
      </ProjectSection>
          </>
  );
}
