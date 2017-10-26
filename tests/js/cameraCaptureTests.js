/* global jqUnit, sjrk */

(function ($, fluid) {

    "use strict";

    // Basic non-IoC synchronous test
    jqUnit.test("Test message stream", function () {
        sjrk.cameraCapture(".sjrkc-cameraCapture");
        jqUnit.expect(0);

        // jqUnit.assertEquals("Test message has expected content", "Hello, world", projectComponent.model.message);
    });

    // // Basic non-IoC asyc test
    // jqUnit.asyncTest("Test message content", function () {
    //     jqUnit.expect(1);
    //
    //     sjrk.cameraCapture(".sjrkc-cameraCapture", {
    //         listeners: {
    //             "onAnnounceComplete.testMessageContent": {
    //                 "this": "jqUnit",
    //                 "method": "assertEquals",
    //                 "args": ["Test message has expected content", "Hello, world", "{that}.model.message"]
    //             },
    //             "onAnnounceComplete.testDone": {
    //                 "this": "jqUnit",
    //                 "method": "start",
    //                 "priority": "after:testMessageContent"
    //             }
    //         }
    //     });
    // });
    //
    // // Basic IoC test structure
    //
    // fluid.defaults("sjrk.cameraCaptureTester", {
    //     gradeNames: ["fluid.test.testCaseHolder"],
    //     modules: [{
    //         name: "Test the sjrk.cameraCapture component.",
    //         tests: [{
    //             name: "Test message content and changes.",
    //             sequence: [{
    //                 listener: "sjrk.cameraCaptureTester.testMessageContent",
    //                 "event": "{projectComponentTest projectComponent}.events.onCreate",
    //                 args: ["{projectComponent}", "Hello, world"]
    //             }]
    //         }]
    //     }]
    // });
    //
    // fluid.defaults("projectTemplate.tests.projectComponentTest", {
    //     gradeNames: ["fluid.test.testEnvironment"],
    //     components: {
    //         projectComponent: {
    //             type: "sjrk.cameraCapture",
    //             container: ".sjrkc-cameraCapture",
    //             createOnEvent: "{projectComponentTester}.events.onTestCaseStart"
    //         },
    //         projectComponentTester: {
    //             type: "sjrk.cameraCaptureTester"
    //         }
    //     }
    // });
    //
    // sjrk.cameraCaptureTester.testMessageContent = function (component, expectedMessage) {
    //     jqUnit.assertEquals("Test message has expected content", expectedMessage, component.model.message);
    // };
    //
    // projectTemplate.tests.projectComponentTest();

})(jQuery, fluid);
