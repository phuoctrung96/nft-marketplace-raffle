const getCurrentStage=(stages,ongoingStage,title)=>{
    const stage = stages.filter(st=>st.stageType===ongoingStage)
    return stage
}

export default getCurrentStage