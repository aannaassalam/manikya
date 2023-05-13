import React, { useState, useEffect } from "react";
import styles from "../../styles/OverviewVideoSection.module.css";

function OverviewVideoSection({ data = {} }) {
  const [content, setContent] = useState(data);

  useEffect(() => {
    setContent(data);
    // setCategories(data.section_content)
  }, []);

  return (
    <div className={styles.overviewVideoSection}>
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-lg-7">
            <div className={styles.videoplayer}>
              {content.section_content != null &&
                content.section_content.length > 0 &&
                content.section_content.map((item, i) => {
                  return (
                    <img
                      key={i}
                      src={item.image}
                      alt="Picture of the author"
                      // width="1000px"
                      // height="750px"
                      width="100%"
                    />
                  );
                })}
            </div>
          </div>
          <div className={`col-lg-5 ${styles.content}`}>
            <div className="content-vCenter">
              <p className="text-prefix text-uppercase">
                {content.section_title ?? ""}
              </p>
              <h2 className="text-primary">{content.description ?? ""}</h2>
              {/* <br /> */}
              {/* <button className='btn btn-primary-outline'>EXPLORE MORE</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewVideoSection;
