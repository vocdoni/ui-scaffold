import { TFunction } from 'i18next'

export const translations = (t: TFunction<string, string>) => ({
  actions: {
    cancel_description: t('cc.actions.cancel_description').toString(),
    cancel: t('cc.actions.cancel').toString(),
    continue_description: t('cc.actions.cancel_description').toString(),
    continue: t('cc.actions.continue').toString(),
    end_description: t('cc.actions.end_description').toString(),
    end: t('cc.actions.end').toString(),
    error_title: t('cc.actions.error_title').toString(),
    pause_description: t('cc.actions.pause_description').toString(),
    pause: t('cc.actions.pause').toString(),
    waiting_title: t('cc.actions.waiting_title').toString(),
  },
  confirm: {
    title: t('cc.confirm.title').toString(),
    cancel: t('cc.confirm.cancel').toString(),
    confirm: t('cc.confirm.confirm').toString(),
  },
  // questions and vote button
  vote: {
    button_update: t('cc.vote.button_update').toString(),
    button: t('cc.vote.button').toString(),
    confirm: t('cc.vote.confirm').toString(),
    voted_description: t('cc.vote.voted_description').toString(),
    voted_title: t('cc.vote.voted_title').toString(),
  },
  empty: t('cc.empty').toString(),
  errors: {
    wrong_data_title: t('cc.errors.wrong_data_title').toString(),
    wrong_data_description: t('cc.errors.wrong_data_description').toString(),
  },
  required: t('cc.required').toString(),
  // results component
  results: {
    date_format: t('cc.results.date_format').toString(),
    secret_until_the_end: t('cc.results.secret_until_the_end').toString(),
    title: t('cc.results.title').toString(),
    votes: t('cc.results.votes').toString(),
  },
  schedule: t('cc.schedule').toString(),
  spreadsheet: {
    access_button: t('cc.spreadsheet.access_button').toString(),
    anon_sik_label: t('cc.spreadsheet.anon_sik_label').toString(),
    anon_sik_helper: t('cc.spreadsheet.anon_sik_helper').toString(),
    close: t('cc.spreadsheet.close').toString(),
    logout: t('cc.spreadsheet.logout').toString(),
    modal_title: t('cc.spreadsheet.modal_title').toString(),
  },
  // status badge
  statuses: {
    canceled: t('cc.statuses.canceled').toString(),
    ended: t('cc.statuses.ended').toString(),
    invalid: t('cc.statuses.invalid').toString(),
    ongoing: t('cc.statuses.ongoing').toString(),
    paused: t('cc.statuses.paused').toString(),
    results: t('cc.statuses.results').toString(),
    upcoming: t('cc.statuses.upcoming').toString(),
    process_unknown: t('cc.statuses.process_unknown').toString(),
  },
})
