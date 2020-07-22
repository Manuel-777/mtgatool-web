/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import sharedcss from "../../shared.css";

import keyArt from "../../assets/images/key-art.jpg";

import css from "../../app.css";
import homeCss from "./home.css";

import MatchFeed from "../match-feed";
import { WrapperInner, WrapperOuter } from "../wrapper";
import { ExportViewProps } from "../../web-types/shared";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/stores/webStore";
import { reduxAction } from "../../redux/webRedux";
import Section from "../Section";
import Flex from "../flex";
import ShowcaseOverlay from "./ShowcaseOverlay";

const DESCRIPTION_TEXT = `MTG Arena Tool is a collection browser, a deck tracker and a statistics manager. Explore which decks you played against and what other players are brewing. MTG Arena Tool is all about improving your Magic Arena experience.`;

function getCurrentOSName(): string {
  const platform = window.navigator.platform;
  if (platform.indexOf("Mac") > -1) return "Mac";
  if (platform.indexOf("Linux") > -1) return "Linux";
  return "Windows";
}

function makeDownloadURL(versionTag: string): string {
  const platform = window.navigator.platform;
  let extension = "exe";
  if (platform.indexOf("Mac") > -1) extension = "pkg";
  if (platform.indexOf("Linux") > -1) extension = "AppImage";

  return `https://github.com/Manuel-777/MTG-Arena-Tool/releases/download/${versionTag}/MTG-Arena-Tool-${versionTag.slice(
    1
  )}.${extension}`;
}

interface FeatureProps {
  title: string;
  subtitle: string;
}

function Feature(props: FeatureProps): JSX.Element {
  const { title, subtitle } = props;
  return (
    <div
      style={{
        backgroundColor: "var(--color-section)",
        borderLeft: "4px solid var(--color-g)",
        borderRadius: "4px",
        padding: "16px",
        maxWidth: "32em",
        height: "11em",
        margin: "auto"
      }}
    >
      <div
        style={{
          fontSize: "1.7em",
          color: "var(--color-text)",
          fontFamily: "var(--main-font-name-bold)"
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: "var(--sub-font-name)", marginTop: "1em" }}>
        {subtitle}
      </div>
    </div>
  );
}

function Home(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  React.useEffect(() => {
    setImage(keyArt);
  }, [setImage]);
  const { versionTag } = useSelector((state: AppState) => state.web);
  const position = React.useRef(window);
  const dispatch = useDispatch();

  const handleScroll = useCallback((): void => {
    reduxAction(dispatch, { type: "SET_SCROLL", arg: window.scrollY });
  }, [dispatch]);

  React.useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return (): void => window.removeEventListener("scroll", handleScroll);
  }, [position, handleScroll]);

  return (
    <>
      <WrapperOuter style={{ height: "120vh" }}>
        <WrapperInner>
          <Section style={{ display: "block", margin: "128px 0 16px 0" }}>
            <div className={css.homeDesc}>
              <div
                className={`${sharedcss.textDescription} ${sharedcss.textLight}`}
              >
                {DESCRIPTION_TEXT}
              </div>
              <a
                className={css.downloadButton}
                href={makeDownloadURL(versionTag)}
              >
                Download for {getCurrentOSName()}
              </a>
              <div className={css.homeDescSmall}>
                <i>* No account required</i>
              </div>
            </div>
          </Section>
          <MatchFeed />
        </WrapperInner>
      </WrapperOuter>

      <WrapperOuter>
        <WrapperInner>
          <Flex style={{ height: "100vh", flexDirection: "column" }}>
            <Flex>
              <ShowcaseOverlay />
              <Feature
                title="In-game Deck tracker"
                subtitle="The best and most cusotmizable overlay you will find. Enable up to 5 different overlays and customize them to suit your needs. You can change their color, position, size and more!"
              />
            </Flex>
            <div className={homeCss.contMargin}>
              <div className={homeCss.showcaseDownloadContainer}>
                <a
                  style={{ margin: "auto 0px" }}
                  className={css.downloadButton}
                  href={makeDownloadURL(versionTag)}
                >
                  Download for {getCurrentOSName()}
                </a>
              </div>
            </div>
          </Flex>
        </WrapperInner>
      </WrapperOuter>
    </>
  );
}

export default Home;
