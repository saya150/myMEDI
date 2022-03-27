import React, { Component } from 'react';
import './App.css';

class Permission extends Component {
    render() {
        return (
           /* <nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<div class="collapse navbar-collapse" id="myNavbar">
						<ul class="nav navbar-nav navbar-right">
						  <li class="active"><a href="#create_permission">Give Create Permission</a></li>
						  <li><a href="#view_form">View Records</a></li>
						</ul>
					  </div>
					</div>
			</nav>
*/
			<div class="container">
				<p>&nbsp;</p>
				<div class="row" id="create_permission">
					
					<h3>Give Create Permission</h3>
	 </div>
			<hr/>
			<form class="form-horizontal" id="register_form" >
				<div class="form-group">
					<label class="control-label col-sm-2" for="doc_addr">Doctor's Ethereum address</label>
					<div class="col-sm-6">
							<input type="text" class="form-control" id="doc_addr" placeholder="Doctor's Ethereum address" name="doc_addr"/>
					</div>
				</div>

				<div class="form-group">
					<label class="control-label col-sm-2" for="patient_addr">Your Ethereum address</label>
					<div class="col-sm-6">
							<input type="text" class="form-control" id="patient_addr" placeholder="Your Ethereum address" name="patient_addr"/>
					</div>
				</div>

				<div class="form-group">        
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" id="btnsubmit" class="btn btn-danger">Give Permission!!</button>
					</div>
				</div>
			</form>

			{/*<div id="postPermit"> </div>

			<div class="row" id="view_permission"><h3>View Records</h3></div>
			<hr/>
			

				 <button id="all_records" type="button" class="btn btn-info">Records</button>*/}
			</div>	
		
            );
    }

}
export default Permission;
