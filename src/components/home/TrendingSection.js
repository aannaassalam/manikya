import React, { useState, useEffect, Fragment } from "react";
import styles from "../../styles/TrendingSection.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function TrendingSection({ data = {} }) {
  const [content, setContent] = useState(data);
  const history = useHistory();

  useEffect(() => {
    setContent(data);
    // setCategories(data.section_content)
  }, []);

  return (
    <div className={styles.trendingSection}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-12">
            <h2 className='section-title text-center'>
              {content.section_title ?? ""}
            </h2>
            {/* <h2 className={`${styles.sectionTitle}`}>See What’s <span>Trending</span></h2> */}
            <p className='section-subtitle text-center'>
              {content.description ?? ""}
            </p>
          </div>
          {content.section_content != null &&
            content.section_content.length > 0 &&
            content.section_content.map((item, i) => {
              return i < 2 ? (
                <Fragment key={i.toString()}>
                  <div className="col-lg-3 col-6">
                    <div
                      className={styles.imageBox}
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className={styles.contentBox}>
                      <h3>{item.title_text ?? ""}</h3>
                      <button className={`btn btn-accent ${styles.exploreBtn}`}>
                        Explore <AiOutlineArrowRight />
                      </button>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment key={i.toString()}>
                  <div className="col-lg-3 col-6">
                    <div className={styles.contentBox}>
                      <h3>{item.title_text ?? ""}</h3>
                      <button
                        className={`btn btn-accent ${styles.exploreBtn}`}
                        onClick={() => {
                          history.push("/category/1");
                        }}
                      >
                        Explore <AiOutlineArrowRight />
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div
                      className={styles.imageBox}
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TrendingSection;
