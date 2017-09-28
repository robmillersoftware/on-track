const router = require('express').Router();
const modelProvider = require('../data/modelProvider');

const api = [
  'VcfoAccountSwitcherRequest',
  'VcfoBillDotComControllerRequest',
  'VcfoCashflow',
  'VcfoDepositActivity',
  'VcfoEnrollFromAnywhereMassMarketRequest',
  'VcfoEntitlementRequest',
  'VcfoMarketingRequest',
  'VcfoMoneyInRequest',
  'VcfoMoneyOutRequest',
  'VcfoNewEnrollmentModelYellowBarRequest',
  'VcfoSpendAnalysisCatListRequest',
  'VcfoSpendAnalysisCatSummaryRequest',
  'VcfoSpendAnalysisCatTransRequest',
  'VcfoSpendAnalysisQuickviewRequest',
  'VcfoDailyTrackerQuickviewRequest',
  'VcfoTrendPlannerRequest',
  'VcfoWelcomeBillPaymentInitRequest',
  'VcfoSettingRequest'
];

/**
 * Wraps the response JSON and adds PNC `status` object with
 * `success` state. This function is for
 */
function successResponse(model) {
  return {
    status: {
      statusCode: 'SUCCESS',
      errorCode: '0',
      message: null
    },
    data: model
  };
}

/**
 * Loads endpoint response model from JSON and wraps in success response.
 */
function endpoint(key) {
  const get = (req, res) => {
    const model = modelProvider.loadModel(key);
    const response = successResponse(model.data ? model.data : model);
    return res.json(response);
  };

  router.use(`/${key}`, get);
}

api.forEach(endpoint);

module.exports = router;
