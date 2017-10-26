/* global sjrk */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.cameraCapture", {
        gradeNames: ["fluid.viewComponent"],
        events: {
            onVideoStreamReady: null,
            onVideoStreamError: null,
            onCameraImageCaptured: null
        },
        listeners: {
            "onCreate.startVideoStream": {
                "func": "sjrk.cameraCapture.startVideoStream",
                "priority": "after:announceComplete",
                "args": ["{that}"]
            },
            "onVideoStreamReady.bindcaptureControl": {
                "this": "{that}.dom.captureControl",
                "method": "click",
                "args": ["{that}.captureImage"]
            },
            "onVideoStreamReady.updateCaptureControlText": {
                "this": "{that}.dom.captureControl",
                "method": "text",
                "args": ["Capture Image"]
            },
            "onVideoStreamReady.bindSaveControl": {
                "this": "{that}.dom.saveControl",
                "method": "click",
                "args": ["{that}.saveCapturedImaged"]
            },
            "onCameraImageCaptured.updateSaveControlText": {
                "this": "{that}.dom.saveControl",
                "method": "text",
                "args": ["Save Captured Image"]
            }
        },
        selectors: {
            canvas: ".sjrkc-cameraCapture-canvas",
            video: ".sjrkc-cameraCapture-video",
            captureControl: ".sjrkc-cameraCapture-captureControl",
            saveControl: ".sjrkc-cameraCapture-saveControl",
            savedImages: ".sjrkc-cameraCapture-savedImages"
        },
        invokers: {
            "captureImage": {
                funcName: "sjrk.cameraCapture.captureImage",
                args: ["{that}"]
            },
            "saveCapturedImaged": {
                funcName: "sjrk.cameraCapture.saveCapturedImaged",
                args: ["{that}"]
            }
        }
    });

    sjrk.cameraCapture.saveCapturedImaged = function (that) {
        var canvas = that.locate("canvas")[0];
        var savedImages = that.locate("savedImages");

        canvas.toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            console.log(url);
            var img = $("<img>").attr("src", url);
            savedImages.append(img);
        });
    };

    sjrk.cameraCapture.captureImage = function (that) {
        var canvas = that.locate("canvas")[0];
        var video = that.locate("video")[0];

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        that.events.onCameraImageCaptured.fire();
    };

    sjrk.cameraCapture.startVideoStream = function (that) {
        var constraints = {
            audio: false,
            video: true
        };

        var video = that.locate("video");

        navigator.mediaDevices.getUserMedia(constraints).
            then(function (stream) {
                video[0].srcObject = stream;
                that.events.onVideoStreamReady.fire();

            }).catch(function (error) {
                that.events.onVideoStreamError.fire("navigator.getUserMedia error: " + error);
            });
    };

})(jQuery, fluid);
