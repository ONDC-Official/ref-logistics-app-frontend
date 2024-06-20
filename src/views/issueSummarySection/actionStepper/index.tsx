import React from 'react'
import { Steps } from 'antd'
import moment from 'moment'
import { IssueTrackingProps } from 'interfaces/views'

const ActionStepper: React.FC<IssueTrackingProps> = ({ singleIssueDetail }) => {
  const outputFormat = 'ddd DD MMM YYYY [at] h:mma'
  const details = singleIssueDetail?.data?.issue?.issue_actions

  const stepperData = [...(details?.complainant_actions || []), ...(details?.respondent_actions || [])]
  const status = singleIssueDetail?.data?.issue?.status || ''
  if (status === 'CLOSED') {
    stepperData.push({
      respondent_action: status,
      short_desc: 'Complaint is ' + status,
    })
  }

  const StepperItems = stepperData.map((e) => ({
    key: e?._id,
    title: e?.complainant_action || e?.respondent_action,
    subTitle: e?.short_desc,
    description: (
      <div>
        <div>Updated At {moment(e?.updated_at).format(outputFormat)}</div>
        <div>{e?.updated_by?.person?.name ? `Updated By: ${e?.updated_by?.person?.name}` : ''}</div>
      </div>
    ),
  }))

  return (
    <>
      <Steps current={StepperItems?.length || 0} direction="vertical" items={StepperItems || []} />
    </>
  )
}

export default ActionStepper
