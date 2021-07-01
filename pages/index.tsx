import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Img from "next/image";
import logo from "../public/images/logo.jpg";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { query } = useRouter();

  // sets the cookie, needs improvement to integrate with main site
  useSWR("/api/cookies", fetcher);

  // fetches the user once room is open
  const { data, error } = useSWR(mounted ? "/api/user" : null, fetcher);

  useEffect(() => {
    query.room ? setMounted(true) : setMounted(false);
  }, [query.room]);

  return (
    <div className={styles.container}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.1.2/socket.io.js"
          defer
        />
        <script type="module" src="/js/rtc.js" defer />
        <script type="module" src="/js/events.js" defer />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/7.3.0/adapter.min.js"
          defer
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
          defer
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"
          defer
        />
        <script
          src="https://cdn.rawgit.com/yahoo/xss-filters/master/dist/xss-filters.js"
          defer
        />
        <script src="/js/autolink.js" defer />
      </Head>

      <div className="custom-modal" id="recording-options-modal">
        <div className="custom-modal-content">
          <div className="row text-center">
            <div className="col-md-6 mb-2">
              <span className="record-option" id="record-video">
                Record video
              </span>
            </div>
            <div className="col-md-6 mb-2">
              <span className="record-option" id="record-screen">
                Record screen
              </span>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <button className="btn btn-outline-danger" id="closeModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar container fixed-top rounded-0 d-print-none">
        <a
          href="#"
          onClick={(e) => {
            window.location.href = "/";
          }}
        >
          <Img alt="clubface logo" src={logo} />
        </a>

        <div className="room-comm" hidden>
          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="toggle-video"
            title="Hide Video"
          >
            <i className="fa fa-video text-dark"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="toggle-mute"
            title="Mute"
          >
            <i className="fa fa-microphone-alt text-dark"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="share-screen"
            title="Share screen"
          >
            <i className="fa fa-desktop text-dark"></i>
          </button>

          <button
            className="btn btn-sm rounded-0 btn-no-effect"
            id="record"
            title="Record"
          >
            <i className="fa fa-dot-circle text-dark"></i>
          </button>

          <button className="btn btn-sm rounded-0 btn-no-effect text-dark">
            <Link href="/">
              <a className="text-white text-decoration-none">
                <i className="fa fa-sign-out-alt text-dark" title="Leave"></i>
              </a>
            </Link>
          </button>
        </div>
        <div className="pull-right">
          <div
            className="inner-container video-chat-id"
            style={
              data
                ? {
                    backgroundImage: `url(${data.member_clubface.clubfacegolf.avatar_image_url})`
                  }
                : {}
            }
          >
            {data ? data.firstname : ""} {data ? data.lastname : ""}
          </div>
        </div>
      </nav>

      <div className="container-fluid" id="room-create" hidden>
        <div className="row">
          <div className="col-12 h2 mt-5 text-center">Create Room</div>
        </div>

        <div className="row mt-2">
          <div className="col-12 text-center">
            <span className="form-text small text-danger" id="err-msg"></span>
          </div>

          <div className="col-12 col-md-4 offset-md-4 mb-3">
            <button
              type="submit"
              id="create-room"
              className="btn btn-block rounded-0 btn-info"
            >
              Create Room Link
            </button>
            <div id="room-created"></div>
            <br />
            <a id="join-room" className="btn btn-block rounded-0 btn-info">
              Join Room
            </a>
          </div>
        </div>
      </div>

      <div className="container-fluid room-comm" hidden>
        <div className="row">
          <video
            className="local-video mirror-mode"
            id="local"
            autoPlay={true}
            muted
          ></video>
        </div>

        <div className="row">
          <div className="col-md-12 main" id="main-section">
            <div className="row mt-2 mb-2" id="videos"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
