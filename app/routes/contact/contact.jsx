import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import styles from './contact.module.css';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in hiring me or just to say Hi!',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

// // export async function action({request}) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//   const formData = new FormData(event.target);
//   const isBot = String(formData.get('name'));
//   const email = String(formData.get('from_name'));
//   const message = String(formData.get('message'));
//   const errors = {};
//   // Return without sending if a bot trips the honeypot
//   // if (isBot) return json({ success: true });

//   // Handle input validation on the server
//   if (!email || !EMAIL_PATTERN.test(email)) {
//     errors.email = 'Please enter a valid email address.';
//   }

//   if (!message) {
//     errors.message = 'Please enter a message.';
//   }

//   if (email.length > MAX_EMAIL_LENGTH) {
//     errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
//   }

//   if (message.length > MAX_MESSAGE_LENGTH) {
//     errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
//   }

//   if (Object.keys(errors).length > 0) {
    
    
//     return json({ errors });
//   }
//   console.log('formData:', formData);
//   try{
//   emailjs.sendForm('service_8qbjcr6', 'template_4iczjis', event.target, 
//   'dCbZwuWwVKOMhWNNY')
//   .then((result) => {
//       console.log(result.text);
//       console.log("message sent!")
//   }, (error) => {
//       console.log(error);
//       console.log("error sending message, try again!")
//   });
  
//   return json({ success: true });

// } catch (error) {
//   console.error('Error processing form submission:', error);
//   return json({ error: 'Internal server error' }, { status: 500 });
// }};

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  // const actionData = useActionData();
  const [actionData, setActionData] = useState({});
  const { state } = useNavigation();
  const sending = state === 'submitting';

  const handleSubmit = async (event) => {
    event.preventDefault();
  const formData = new FormData(event.target);
  const isBot = String(formData.get('name'));
  const email = String(formData.get('from_name'));
  const message = String(formData.get('message'));
  const errors = {};
  // Return without sending if a bot trips the honeypot
  if (isBot) setActionData({'success': true});

  // Handle input validation on the server
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    
    
    setActionData(errors);
  }
  try{
  emailjs.sendForm('service_8qbjcr6', 'template_4iczjis', event.target, 
  'dCbZwuWwVKOMhWNNY')
  .then((result) => {
      console.log(result.text);
      console.log("message sent!");
      setActionData({'success': true});
  }, (error) => {
      console.log(error);
      console.log("error sending message, try again!");
  });
} catch (error) {
  console.error('Error processing form submission:', error);
  return json({ error: 'Internal server error' }, { status: 500 });
}};


  return (
    <Section className={styles.contact}>
      <Transition unmount in={!actionData?.success} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            id='contact_form'
            unstable_viewTransition
            className={styles.form}
            method="post"
            onSubmit={handleSubmit}
            ref={nodeRef}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="from_name"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <Transition
              unmount
              in={!sending && actionData?.errors}
              timeout={msToNum(tokens.base.durationM)}
            >
              {({ status: errorStatus, nodeRef }) => (
                <div
                  className={styles.formError}
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {actionData?.errors?.email}
                      {actionData?.errors?.message}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={actionData?.success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you ASAP
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
