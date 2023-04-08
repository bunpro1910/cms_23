import { FaHome, FaEye, FaUpload, FaFolder } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


import { useRef, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import Footer from './Footer';


import { useQuery } from 'react-query'

function Navbar() {



    return (
        <>

            <div class="container">
                <h1 class="mt-3">Terms and Conditions</h1>
                <hr />
                <h2>Introduction</h2>
                <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at www.example.com.</p>

                <h2>Intellectual Property Rights</h2>
                <p>Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the licence below, all our intellectual property rights are reserved.</p>

                <h2>Acceptable Use</h2>
                <p>You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>

                <h2>Disclaimer</h2>
                <p>The information contained in this website is for general information purposes only. The information is provided by us and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>

                <h2>Limitations of Liability</h2>
                <p>We shall not be liable for any indirect, special or consequential loss, including without limitation loss of business, loss of profits, or loss of data or information.</p>

                <h2>Indemnification</h2>
                <p>You agree to indemnify and hold us harmless from and against any and all claims, losses, expenses, demands, or liabilities, including attorneys’ fees and costs, incurred by us arising out of or related in any way to your use of the website.</p>

                <h2>Termination</h2>
                <p>We may terminate or suspend your access to the website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                <h2>Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the State of [state/country], without regard to its conflict of law provisions.</p>

                <h2>Changes to Terms and Conditions</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our website after any revisions become effective, you agree to be bound by the updated terms. If you do not agree to the new terms, you are no longer authorized to use the website.</p>

                <hr />
                <p class="text-muted">If you have any questions or concerns about these Terms and Conditions, please contact us at [contact information].</p>
            </div>


        </>
    );
}

export default Navbar;
