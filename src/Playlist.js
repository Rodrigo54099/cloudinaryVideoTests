import React, { useEffect } from "react";
import { Cloudinary } from "cloudinary-core";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

function VideoPlayerFunction(props) {
  const cld = new Cloudinary({
    cloud_name: props.options.cloudName,
    secure: true
  });

  const videoPlayerInit = () => {
    const player = cld.videoPlayer("example-player", {
      controls: true,
      bigPlayButton: false,
      playbackRates: ["0.5", "1.0", "1.25", "1.5", "1.75", "2.0"],
      showLogo: true, // Logo can be replaced with parameter logoImageUrl
      colors: {
        accent: "f7bc00"
      },
      transformation: { fetch_format: "auto", quality: "auto" },
      fluid: true,
      showJumpControls: true,
      playlistWidget: {
        direction: "vertical",
        total: 4
      },
      floatingWhenNotVisible: "left"
    });

    player
      .playlistByTag(props.options.tag, {
        autoAdvance: false,
        repeat: true
      })
      .then(function (player) {
        console.log("player object", player);
        // basically getting the list of public_id.
        let list = player
          .playlist()
          .list()
          .map((source) => {
            return source.publicId();
          });
        console.log("list of public id: ", list);
      });
  };

  useEffect(() => {
    return videoPlayerInit(), [];
  });

  return (
    <>
      <video id="example-player" />
    </>
  );
}

export default VideoPlayerFunction;
