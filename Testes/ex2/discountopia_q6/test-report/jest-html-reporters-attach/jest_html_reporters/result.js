window.jest_html_reporters_callback__({"numFailedTestSuites":0,"numFailedTests":0,"numPassedTestSuites":1,"numPassedTests":25,"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":1,"numTotalTests":25,"startTime":1684287541215,"success":false,"testResults":[{"numFailingTests":0,"numPassingTests":25,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1684287544929,"runtime":3645,"slow":false,"start":1684287541284},"testFilePath":"C:\\Users\\Eduardo\\Desktop\\AlphaED\\Testes\\ex2\\discountopia_q6\\__tests__\\integration\\orders.test.js","failureMessage":null,"testResults":[{"ancestorTitles":["GET /orders/:order_id/items"],"duration":152,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":85,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 401 if user token is invalid","status":"passed","title":"should return status 401 if user token is invalid"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":77,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 400 if order_id is invalid","status":"passed","title":"should return status 400 if order_id is invalid"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":82,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 404 if order does not exist","status":"passed","title":"should return status 404 if order does not exist"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":106,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return status 403 if user is not owner of the order","status":"passed","title":"should return status 403 if user is not owner of the order"},{"ancestorTitles":["GET /orders/:order_id/items"],"duration":98,"failureMessages":[],"fullName":"GET /orders/:order_id/items should return the order items and status 200 if user is the owner of the order","status":"passed","title":"should return the order items and status 200 if user is the owner of the order"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":92,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":107,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 400 if order_id is not a positive integer","status":"passed","title":"Should return status 400 if order_id is not a positive integer"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":109,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 400 if product_id is not a positive integer","status":"passed","title":"Should return status 400 if product_id is not a positive integer"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":104,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 400 if quantity is not a positive integer","status":"passed","title":"Should return status 400 if quantity is not a positive integer"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":99,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 404 if the order does not exist","status":"passed","title":"Should return status 404 if the order does not exist"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":99,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 404 if the product does not exist","status":"passed","title":"Should return status 404 if the product does not exist"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":97,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id should return status 403 if user is not owner of the order","status":"passed","title":"should return status 403 if user is not owner of the order"},{"ancestorTitles":["PATCH /orders/:order_id/items/:product_id"],"duration":97,"failureMessages":[],"fullName":"PATCH /orders/:order_id/items/:product_id Should return status 404 if the product does not exist in the order","status":"passed","title":"Should return status 404 if the product does not exist in the order"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":96,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes should return status 401 if user token is missing","status":"passed","title":"should return status 401 if user token is missing"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":101,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 400 if the order_id is not integer positive number","status":"passed","title":"Should return status 400 if the order_id is not integer positive number"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":98,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 404 if the code is not a string","status":"passed","title":"Should return status 404 if the code is not a string"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":94,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 404 if the order does not exist","status":"passed","title":"Should return status 404 if the order does not exist"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":94,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if the user is not owner of the order","status":"passed","title":"Should return status 403 if the user is not owner of the order"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":89,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if the order is already finished","status":"passed","title":"Should return status 403 if the order is already finished"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":99,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 404 if the discount does not exist","status":"passed","title":"Should return status 404 if the discount does not exist"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":99,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if the discount is no longer valid","status":"passed","title":"Should return status 403 if the discount is no longer valid"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":102,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if the total purchase amount is less than the minimum discount value","status":"passed","title":"Should return status 403 if the total purchase amount is less than the minimum discount value"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":109,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if no product belongs to the discount category","status":"passed","title":"Should return status 403 if no product belongs to the discount category"},{"ancestorTitles":["POST /orders/:order_id/discount-codes"],"duration":112,"failureMessages":[],"fullName":"POST /orders/:order_id/discount-codes Should return status 403 if the discount code has already been used in the same or another order by the user","status":"passed","title":"Should return status 403 if the discount code has already been used in the same or another order by the user"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":false,"collectCoverage":true,"collectCoverageFrom":[],"coverageDirectory":"C:\\Users\\Eduardo\\Desktop\\AlphaED\\Testes\\ex2\\discountopia_q6\\test-report\\coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":1,"noStackTrace":false,"nonFlagArgs":["integration"],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["C:\\Users\\Eduardo\\Desktop\\AlphaED\\Testes\\ex2\\discountopia_q6\\node_modules\\jest-html-reporters\\index.js",{"publicPath":"./test-report"}]],"rootDir":"C:\\Users\\Eduardo\\Desktop\\AlphaED\\Testes\\ex2\\discountopia_q6","runTestsByPath":false,"seed":-1910454841,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"integration","testSequencer":"C:\\Users\\Eduardo\\Desktop\\AlphaED\\Testes\\ex2\\discountopia_q6\\node_modules\\@jest\\test-sequencer\\build\\index.js","updateSnapshot":"new","useStderr":false,"verbose":true,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false,"coverageLinkPath":"coverage\\lcov-report\\index.html"},"endTime":1684287544962,"_reporterOptions":{"publicPath":"./test-report","filename":"jest_html_reporters.html","expand":false,"pageTitle":"","hideIcon":false,"testCommand":"","openReport":false,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false},"logInfoMapping":{},"attachInfos":{}})