const getCurrentStage=(stages,ongoingStage)=>{
    const stage = stages.filter(st=>st.stageType===ongoingStage)
    
    return stage
}

export default getCurrentStage