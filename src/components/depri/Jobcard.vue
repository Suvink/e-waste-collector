<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Job #PnBoZgC</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column imgcolumn">
                        <img class="job-image" src="https://i.ytimg.com/vi/mf1XBLzZoAA/maxresdefault.jpg">
                    </div>
                    <div class="column is-7 jobdetails">
                        <h6>    
                           <span class="icon"><i class="fas fa-box-open" aria-hidden="true"></i></span>
                            Mobile Phone
                        </h6>
                        <h6>
                            <span class="icon"><i class="fas fa-box-open" aria-hidden="true"></i></span>
                            Apple
                        </h6>
                        <h6>
                            <span class="icon"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></span>
                            No 66,Awissawella Road,Rathnapura
                        </h6>
                        <h6>
                            <span class="icon"><i class="fas fa-phone" aria-hidden="true"></i></span>
                            0771655198
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <footer class="card-footer justify-content-center pb-1">
            <Button class="button is-danger">Add to my list</Button>
        </footer>
    </div>
</template>

<script>
export default {
 name: 'Jobcard'
}
</script>

<style>
@import url('../assets/css/style.css');
.jobdetails{
    text-align: left;
}
.imgcolumn{
    overflow: hidden;
    align-self: center;
}
.card-footer{
    border: none
}
</style>