import React, { Component } from 'react';
import './App.css';

class Share extends Component {
    render() {
        return (
			<div class="container">
				<p>&nbsp;</p>
				<div>
					<h2>share records</h2>
					</div>
				<form class="form-horizontal" id="share_form" >
					
					<br />
					<br/>
					<div class="form-group">
						<label class="control-label col-sm-4" for="eth_addr">Your Ethereum address</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="eth_addr" placeholder="Your Address" name="eth_addr"/>
			</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" for="share_addr">Your friend's/Doctor's  Ethereum address</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="share_addr" placeholder="Share with Address" name="share_addr"/>
			</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="rec_name">Record Name</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="rec_name" placeholder="test1" name="rec_name"/>
			</div>
								</div>

								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-10">
										<button type="submit" id="share_submit" class="btn btn-success">share</button>
									</div>
								</div>
	</form>
							<div id="post_share">
							</div>
						</div>
            );
    }

}
export default Share;
