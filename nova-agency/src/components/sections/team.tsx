import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { teamMembers } from "@/lib/constants";

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM8 18C8.27614 18 8.5 17.7761 8.5 17.5V10.5C8.5 10.2239 8.27614 10 8 10H6.5C6.22386 10 6 10.2239 6 10.5V17.5C6 17.7761 6.22386 18 6.5 18H8ZM7.25 9C6.42157 9 5.75 8.32843 5.75 7.5C5.75 6.67157 6.42157 6 7.25 6C8.07843 6 8.75 6.67157 8.75 7.5C8.75 8.32843 8.07843 9 7.25 9ZM17.5 18C17.7761 18 18 17.7761 18 17.5V12.9C18.0325 11.3108 16.8576 9.95452 15.28 9.76C14.177 9.65925 13.1083 10.1744 12.5 11.1V10.5C12.5 10.2239 12.2761 10 12 10H10.5C10.2239 10 10 10.2239 10 10.5V17.5C10 17.7761 10.2239 18 10.5 18H12C12.2761 18 12.5 17.7761 12.5 17.5V13.75C12.5 12.9216 13.1716 12.25 14 12.25C14.8284 12.25 15.5 12.9216 15.5 13.75V17.5C15.5 17.7761 15.7239 18 16 18H17.5Z" fill="currentColor"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9728 6.7174C20.5084 7.33692 19.947 7.87733 19.3103 8.31776C19.3103 8.47959 19.3103 8.64142 19.3103 8.81225C19.3154 11.7511 18.1415 14.5691 16.0518 16.6345C13.962 18.6999 11.1312 19.8399 8.19405 19.7989C6.49599 19.8046 4.81967 19.4169 3.29642 18.6661C3.21428 18.6302 3.16131 18.549 3.16162 18.4593V18.3604C3.16162 18.2313 3.26623 18.1267 3.39527 18.1267C5.06442 18.0716 6.67402 17.4929 7.99634 16.4724C6.48553 16.4419 5.12619 15.5469 4.5006 14.1707C4.46901 14.0956 4.47884 14.0093 4.52657 13.9432C4.57429 13.8771 4.653 13.8407 4.73425 13.8471C5.19342 13.8932 5.65718 13.8505 6.1002 13.7212C4.43239 13.375 3.17921 11.9904 2.99986 10.2957C2.99349 10.2144 3.02992 10.1357 3.096 10.0879C3.16207 10.0402 3.24824 10.0303 3.32338 10.062C3.77094 10.2595 4.25409 10.3635 4.74324 10.3676C3.28184 9.40846 2.65061 7.58405 3.20655 5.92622C3.26394 5.76513 3.40181 5.64612 3.5695 5.61294C3.73718 5.57975 3.90996 5.63728 4.02432 5.76439C5.99639 7.86325 8.70604 9.11396 11.5819 9.25279C11.5083 8.95885 11.4721 8.65676 11.4741 8.35372C11.501 6.76472 12.4842 5.34921 13.9634 4.76987C15.4425 4.19054 17.1249 4.56203 18.223 5.71044C18.9714 5.56785 19.695 5.31645 20.3707 4.96421C20.4202 4.93331 20.483 4.93331 20.5325 4.96421C20.5634 5.01373 20.5634 5.07652 20.5325 5.12604C20.2052 5.87552 19.6523 6.50412 18.9509 6.92419C19.5651 6.85296 20.1685 6.70807 20.7482 6.49264C20.797 6.45942 20.8611 6.45942 20.9099 6.49264C20.9508 6.51134 20.9814 6.54711 20.9935 6.59042C21.0056 6.63373 20.998 6.68018 20.9728 6.7174Z" fill="currentColor"/>
    </svg>
  );
}

export default function Team() {
  return (
    <section className="section-team">
      <div className="padding-global">
        <div className="container-large">
          <div className="section-padding-large">
            <div className="team-section-header">
              <div className="max-width-large">
                <ScrollReveal>
                  <div className="tagline-pill">
                    <div>Meet the team</div>
                  </div>
                </ScrollReveal>
                <div className="margin-bottom margin-small">
                  <ScrollReveal delay={0.1}>
                    <h2 className="heading-style-h2 weight-medium">Our team</h2>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2}>
                  <p className="text-size-medium">
                    Meet our passionate talent here.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.2}>
                <div className="button-group">
                  <Link href="/about#team" className="button">
                    All team members
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className="team-component">
              <div className="team-list-wrapper">
                <ScrollReveal delay={0.1}>
                  <div className="team-list">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="team-item">
                        <div className="margin-bottom margin-xsmall">
                          <div className="team-image-wrapper">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={400}
                              height={533}
                              className="team-image"
                              sizes="(max-width: 479px) 83vw, (max-width: 767px) 86vw, (max-width: 991px) 40vw, 19vw"
                            />
                          </div>
                        </div>
                        <div className="member-info-wrapper">
                          <div className="team-member-wrapper">
                            <div className="text-size-large weight-medium">
                              {member.name}
                            </div>
                            <div className="text-size-medium" style={{ color: "var(--gray)" }}>
                              {member.role}
                            </div>
                          </div>
                          <p className="text-size-regular">{member.bio}</p>
                          <div className="team-socials">
                            {member.socials.linkedin && (
                              <a
                                href={member.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="team-social-link"
                              >
                                <div className="team-social-icon">
                                  <LinkedInIcon />
                                </div>
                              </a>
                            )}
                            {member.socials.twitter && (
                              <a
                                href={member.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="team-social-link"
                              >
                                <div className="team-social-icon">
                                  <TwitterIcon />
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
