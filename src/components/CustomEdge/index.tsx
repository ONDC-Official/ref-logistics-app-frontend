import { FC } from 'react'
import { BaseEdge, getStraightPath, EdgeProps } from 'reactflow'

const CustomLineEdge: FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return <BaseEdge id={id} path={edgePath} />
}

export { CustomLineEdge }
