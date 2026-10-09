import ScrollReveal from "@/components/ui/scroll-reveal";
import type { HomePageSettings } from "@/lib/schemas/home-page-settings";
export default function HomeCompanySnapshot({settings}: {settings: HomePageSettings}) {
  return (
      <div className="section-stats home-company-snapshot">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="stats-component">
                <div className="stats-section-header">
                  <div className="max-width-large">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>{settings.snapshotTagline}</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h2 className="heading-style-h2 weight-medium">
                          {settings.snapshotTitle}
                        </h2>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        {settings.snapshotDescription}
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
                <ScrollReveal delay={0.1}>
                  <div className="stats-list">
                    {settings.stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`stats-item is-${stat.variant}`}
                      >
                        <div className="margin-bottom margin-large">
                          <div className="stat-number">{stat.value}</div>
                        </div>
                        <div className="stat-item-content">
                          <h3 className="heading-style-h6">{stat.label}</h3>
                          <div className="margin-top margin-xsmall snapshot-card-description">
                            <p className="text-size-regular">
                              {stat.description}
                            </p>
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

  );
}
