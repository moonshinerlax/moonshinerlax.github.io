import { baseMeta } from "~/utils/meta";
import { businesslist } from "../bussinesslist/churreriatradicional";
import { Link } from "@remix-run/react";
import { ProjectContainer, ProjectHeader, ProjectSection } from "~/layouts/project";
import { List, ListItem } from "~/components/list";



export const meta = () => {
    return baseMeta({
      title: 'Contact',
      description:
        'Send me a message if you’re interested in hiring me or just to say Hi!',
    });
  };

export const Businesscards = () => {
  const contacts = businesslist;
  return (
    <ProjectContainer>
      <ProjectHeader title="Business Digital Cards">
      </ProjectHeader>
      <ProjectSection>
        <List>
      { contacts.map((buss) => (
        <div key={ buss.name }>
          <ListItem>
          <Link to={`${buss.id}`}>
          {buss.name}
          </Link>
          </ListItem>
        </div>
      ))}
      </List>
      </ProjectSection>
    </ProjectContainer>
    );
};
